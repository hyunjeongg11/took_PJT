package com.took.user_api.service.implement;


import com.took.fcm_api.dto.AlarmRequest;
import com.took.fcm_api.dto.MessageRequest;
import com.took.fcm_api.service.FCMService;
import com.took.user_api.dto.request.party.*;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.party.MakePartyResponseDto;
import com.took.user_api.dto.response.party.PartyDetailResponseDto;
import com.took.user_api.dto.response.party.ojResponseDto;
import com.took.user_api.entity.*;
import com.took.user_api.repository.*;
import com.took.user_api.repository.custom.BankRepositoryCustom;
import com.took.user_api.repository.custom.MemberRepositoryCustom;
import com.took.user_api.service.PartyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService {

    private final PartyRepository partyRepository;
    private final MemberRepositoryCustom memberRepositoryCustom;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final BankRepository bankRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final FCMService fcmService;
    private final AccountRepository accountRepository;


    @Transactional
    @Override
    public ResponseEntity<? super MakePartyResponseDto> makeParty(MakePartyRequestDto dto) {

        PartyEntity party = PartyEntity.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .cost(dto.getCost())
                .status(false)
                .createdAt(LocalDateTime.now())
                .count(0)
                .totalMember(dto.getTotalMember())
                .deliveryTip(dto.getDeliveryTip())
                .build();

        PartyEntity newParty = partyRepository.save(party);
        UserEntity user = userRepository.findById(dto.getUserSeq()).orElseThrow();

//          일단 정산 전이기에 자신의 cost로 0으로 설정 // status (정산 여부도 설정)
        // 일단 맴버도 돈을 다 낸건 아니기 때문에!
        MemberEntity member = MemberEntity
                .builder()
                .party(newParty)
                .user(user)
                .cost(0L)
                .status(false)
                .receive(false)
                .leader(true)
                .createdAt(LocalDateTime.now())
                .fakeCost(0L)
                .build();
        MemberEntity newMember = memberRepository.save(member);

        return MakePartyResponseDto.success(newParty.getPartySeq(), newMember.getMemberSeq());
    }


    @Transactional
    @Override
    public ResponseEntity<? super PartyDetailResponseDto> partyDetail(PartyDetailRequestDto dto) {

        Long userSeq = dto.getUserSeq();
        Long partySeq = dto.getPartySeq();
        // party리스트 넘기기
        // userSeq를 불러온 이유? 내꺼는 올라오면 안되기 때문
        List<MemberEntity> partyDetailList = memberRepositoryCustom.partyDetail(userSeq, partySeq);
        return PartyDetailResponseDto.success(partyDetailList);
    }


    @Transactional
    @Override
    public ResponseEntity<?> partyDelete(Long partySeq) {
        partyRepository.deleteById(partySeq);
        return null;
    }


    @Transactional
    @Override
    public ResponseEntity<? super VoidResponseDto> insertAllMember(InsertAllMemberRequestDto requestBody) {
        try {
            PartyEntity party = partyRepository.findById(requestBody.getPartySeq()).orElseThrow();
            int cate = party.getCategory();


            Long leaderSeq = memberRepositoryCustom.findLeaderByPartySeq(party.getPartySeq());
            UserEntity leader = userRepository.findById(leaderSeq).orElseThrow();
            String name = leader.getUserName();

            long deliveryTip = 0L;
            if (party.getDeliveryTip() != null) {
                deliveryTip = party.getDeliveryTip() / party.getTotalMember();
            }

            for (InsertAllMemberRequestDto.userCost userCost : requestBody.getUserCosts()) {
                if (userCost.getUserSeq().equals(leaderSeq)) continue;
                UserEntity user = userRepository.getReferenceById(userCost.getUserSeq());
                MemberEntity member = MemberEntity.builder()
                        .party(party)
                        .user(user)
                        .cost(userCost.getCost() + deliveryTip)
                        .status(false)
                        .receive(false)
                        .leader(false)
                        .createdAt(LocalDateTime.now())
                        .fakeCost(0L)
                        .build();
                memberRepository.save(member);

                AlarmRequest alarm = new AlarmRequest();
                alarm.setBody(name.charAt(0) + "*" + name.charAt(2) + "님에게 " + userCost.getCost() + "원 TOOK!!");
                alarm.setSender(leaderSeq);
                alarm.setUserSeq(userCost.getUserSeq());
                alarm.setPartySeq(party.getPartySeq());


                if (party.getDeliveryTip() != null) {
                    alarm.setDeliveryCost(deliveryTip);
                    alarm.setCost(deliveryTip + userCost.getCost());
                }

//              배달
                if (cate == 1) {
                    alarm.setTitle("배달 took 정산 요청이 왔어요!");
                    alarm.setCategory(1);

//              택시
                } else if (cate == 2) {
                    alarm.setTitle("택시 took 정산 요청이 왔어요!");
                    alarm.setCategory(2);

//               공동구매
                } else if (cate == 3) {
                    alarm.setTitle("공동구매 took 정산 요청이 왔어요!");
                    alarm.setCategory(3);

//               더치페이
                } else if (cate == 4) {
                    alarm.setTitle("정산 took 정산 요청이 왔어요!");
                    alarm.setCategory(4);
//                  정산이니까 엔빵
                    alarm.setCost(userCost.getCost());
                }
                fcmService.sendNotification(alarm);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return VoidResponseDto.success();
    }

    //   게스트들이 송금 버튼을 눌렀을 때
    @Override
    @Transactional
    public ResponseEntity<? super ojResponseDto> onlyjungsanPay(Long partySeq, Long userSeq) {

        boolean done = false;
        BankEntity bank = null;

        try {
            MemberEntity member = memberRepositoryCustom.findMemberByPartySeqAndUserSeq(partySeq, userSeq);
            Long membercost = member.getCost();

            PartyEntity party = partyRepository.getReferenceById(partySeq);

//          빼주기 전에 돈 있는 없는지 검사
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            bank = bankRepository.getReferenceById(bankSeq);
            long balance = bank.getBalance();

            if (balance < membercost) return ResponseDto.nomoney();

//          맴버 상태 업데이트
            member.updateStatus(true);
            party.updateCount(1);

//          돈빼주고 저장
            bank.updateBalance(balance - membercost);

//          빼주는 순간 리더에게 돈 들어가게
            Long leaderSeq = memberRepositoryCustom.findLeaderByPartySeq(partySeq);
            Long leaderBankSeq = bankRepositoryCustom.findBankSeqByUserSeq(leaderSeq);
            BankEntity leaderBankEntity = bankRepository.getReferenceById(leaderBankSeq);
            balance = leaderBankEntity.getBalance() + membercost;
            leaderBankEntity.updateBalance(balance);

            UserEntity sender = userRepository.findById(userSeq).orElseThrow();
            String name = sender.getUserName();

            fcmService.sendMessage(
                    MessageRequest.builder()
                            .title("송금 알림")
                            .body(name.charAt(0) + "*" + name.charAt(2) + "님이 " + membercost + "원을 송금하였습니다!")
                            .userSeqList(List.of(leaderSeq))
                            .build()
            );


            partyRepository.flush();

            if (party.getCount() == party.getTotalMember() - 1) {
                done = true;
                party.updateStatus(true);

                fcmService.sendMessage(
                        MessageRequest.builder()
                                .title("'" + party.getTitle() + "' 정산 알림")
                                .body("정산이 완료되었습니다!")
                                .userSeqList(List.of(leaderSeq))
                                .build()
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ojResponseDto.success(done);
    }


    @Transactional
    @Override
    public ResponseEntity<? super ojResponseDto> onlyjungsanRecieve(Long partySeq, Long userSeq) {

        try {

            PartyEntity party = partyRepository.getReferenceById(partySeq);
            Long N = (long) party.getTotalMember();

            Long recieveCost = party.getReceiveCost() * (N - 1L) / N;

//          뱅크 가져와서 업데이트
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            BankEntity bank = bankRepository.getReferenceById(bankSeq);
            Long balance = bank.getBalance();
            bank.updateBalance(balance + recieveCost);
            bankRepositoryCustom.updateBalanceByBankSeq(bank.getBalance(), bankSeq);


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ojResponseDto.success(true);
    }


    @Transactional
    @Override
    public ResponseEntity<? super ojResponseDto> deligonguPay(Long memberSeq, Long userSeq) {

        MemberEntity member = memberRepository.findById(memberSeq).orElseThrow();
        PartyEntity party = partyRepository.findById(member.getParty().getPartySeq()).orElseThrow();

        //빼주기 전에 돈 있는 없는지 검사
        UserEntity user = userRepository.findById(userSeq).orElseThrow();
        AccountEntity account = accountRepository.findByUserAndMainTrue(user);
        BankEntity bank = bankRepository.findById(account.getBank().getBankSeq()).orElseThrow();

        Long balance = bank.getBalance();
        Long membercost = member.getCost();

        if (balance < membercost) return ResponseDto.nomoney();
        bank.updateBalance(balance - membercost);
        member.updateStatus(true);
        party.updateReceiveCost(party.getReceiveCost() + membercost);
        party.updateCount(party.getCount() + 1);
        partyRepository.flush();

        // 모든 사람이 결제 완료 (결제자제외)
        if (party.getCount() == party.getTotalMember() - 1) {
            Long leaderSeq = memberRepositoryCustom.findLeaderByPartySeq(party.getPartySeq());
            fcmService.sendMessage(
                    MessageRequest.builder()
                            .title("`" + party.getTitle() + "` 모든 사람 결제 완료!")
                            .body("주문을 진행해 주세요")
                            .userSeqList(List.of(leaderSeq))
                            .build()
            );
            return ojResponseDto.success(true);
        }
        return ojResponseDto.success(false);
    }


    @Transactional
    @Override
    public void deligonguHostRecieve(Long partySeq, Long userSeq) {

        PartyEntity party = partyRepository.findById(partySeq).orElseThrow();
        Long receiveCost = party.getReceiveCost();
        Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
        BankEntity bank = bankRepository.findById(bankSeq).orElseThrow();
        Long balance = bank.getBalance();
        bank.updateBalance(receiveCost + balance);
        party.updateStatus(true);

        // 알림 생성
        fcmService.sendMessage(
                MessageRequest.builder()
                        .title(party.getTitle() + " 정산 완료")
                        .body(receiveCost + "원이 정산 되었습니다.")
                        .userSeqList(List.of(userSeq))
                        .build()
        );
    }


    @Transactional
    @Override
    public Long makeTaxiParty(MakeTaxiPartyRequest requestBody) {
        PartyEntity party = PartyEntity.builder()
                .title(requestBody.getTitle())
                .category(requestBody.getCategory())
                .cost(requestBody.getCost())
                .status(false)
                .createdAt(LocalDateTime.now())
                .count(requestBody.getUsers().size())
                .totalMember(requestBody.getUsers().size())
                .build();
        PartyEntity newParty = partyRepository.save(party);

        long receiveCost = 0L;
        for (MakeTaxiPartyRequest.User user : requestBody.getUsers()) {
            boolean check = user.getUserSeq().equals(requestBody.getMaster());
            UserEntity userEntity = userRepository.findById(user.getUserSeq()).orElseThrow();

            long fakeCost = 0L;
            if (!check) {
                // 가결제
                AccountEntity account = accountRepository.findByUserAndMainTrue(userEntity);
                BankEntity bank = bankRepository.findById(account.getBank().getBankSeq()).orElseThrow();

                fakeCost = user.getFakeCost();
                long balance = bank.getBalance() - fakeCost;
                receiveCost += fakeCost;

                if (balance >= 0) {
                    bank.updateBalance(balance);
                } else {
                    throw new RuntimeException("돈이 부족합니다.");
                }
            }

            // member DB 추가
            MemberEntity member = MemberEntity.builder()
                    .party(newParty)
                    .user(userEntity)
                    .cost(0L)
                    .status(true)
                    .receive(false)
                    .leader(check)
                    .createdAt(LocalDateTime.now())
                    .fakeCost(fakeCost)
                    .build();
            memberRepository.save(member);
        }
        partyRepository.flush();
        newParty.updateReceiveCost(receiveCost);

        // 여기다 알림 추가 ( ~~원 가결제 완료, 반복문(리더제외) )
        for (MakeTaxiPartyRequest.User user : requestBody.getUsers()) {
            if (user.getUserSeq().equals(requestBody.getMaster())) continue;
            fcmService.sendMessage(
                    MessageRequest.builder()
                            .title("택시 결제 알림")
                            .body(user.getFakeCost() + "원이 결제 되었습니다.")
                            .userSeqList(List.of(user.getUserSeq()))
                            .build());
        }
        return newParty.getPartySeq();
    }


    @Transactional
    @Override
    public void finalTaxiParty(FinalTaxiPartyRequest requestBody) {
        PartyEntity party = partyRepository.findById(requestBody.getPartySeq()).orElseThrow();
        party.updateCost(requestBody.getCost());

        long receiveCost = party.getReceiveCost();

        for (FinalTaxiPartyRequest.User user : requestBody.getUsers()) {
            MemberEntity member = memberRepositoryCustom.findMemberByPartySeqAndUserSeq(party.getPartySeq(), user.getUserSeq());
            if (member.isLeader()) continue; // 결제자는 패스

            member.updateCost(user.getCost());
            long fakecost = member.getFakeCost();
            long exchange = fakecost - user.getCost();

            UserEntity tmp = userRepository.findById(user.getUserSeq()).orElseThrow();
            AccountEntity account = accountRepository.findByUserAndMainTrue(tmp);
            BankEntity bank = bankRepository.findById(account.getBank().getBankSeq()).orElseThrow();
            long balance = bank.getBalance() + exchange;
            bank.updateBalance(balance);

            fcmService.sendMessage(
                    MessageRequest.builder()
                            .title("택시 결제 알림")
                            .body(exchange + "원이 반환 되었습니다.")
                            .userSeqList(List.of(user.getUserSeq()))
                            .build()
            );
        }

        MemberEntity leaderMember = memberRepository.findByPartyAndLeaderTrue(party);
        UserEntity leader = userRepository.findById(leaderMember.getUser().getUserSeq()).orElseThrow();

        AccountEntity account = accountRepository.findByUserAndMainTrue(leader);
        BankEntity bank = bankRepository.findById(account.getBank().getBankSeq()).orElseThrow();
        long balance = bank.getBalance() + receiveCost;
        bank.updateBalance(balance);

        fcmService.sendMessage(
                MessageRequest.builder()
                        .title("택시 결제 알림")
                        .body(receiveCost + "원이 정산 되었습니다.")
                        .userSeqList(List.of(leader.getUserSeq()))
                        .build()
        );
    }

}
