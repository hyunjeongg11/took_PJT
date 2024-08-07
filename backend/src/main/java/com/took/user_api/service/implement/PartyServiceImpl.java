package com.took.user_api.service.implement;


import com.took.fcm_api.dto.AlarmRequest;
import com.took.fcm_api.dto.MessageRequest;
import com.took.fcm_api.service.FCMService;
import com.took.user_api.dto.request.party.*;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.party.*;
import com.took.user_api.entity.BankEntity;
import com.took.user_api.entity.MemberEntity;
import com.took.user_api.entity.PartyEntity;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.BankRepository;
import com.took.user_api.repository.MemberRepository;
import com.took.user_api.repository.PartyRepository;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.repository.custom.BankRepositoryCustom;
import com.took.user_api.repository.custom.MemberRepositoryCustom;
import com.took.user_api.repository.custom.PartyRepositoryCustom;
import com.took.user_api.service.PartyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService {

    private final PartyRepository partyRepository;
    private final PartyRepositoryCustom partyRepositoryCustom;
    private final MemberRepositoryCustom memberRepositoryCustom;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final BankRepository bankRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final FCMService fcmService;



    @Override
    public ResponseEntity<? super MakePartyResponseDto> makeParty(MakePartyRequestDto dto) {

        Long partySeq = null;
        Long memberSeq = null;

        try{

            PartyEntity party = new PartyEntity(dto.getTitle(),dto.getCategory(),dto.getCost(),dto.getTotalMember(), dto.getDeliveryTip());
            PartyEntity newparty = partyRepository.save(party);
            partySeq = newparty.getPartySeq();
            UserEntity user = userRepository.getReferenceById(dto.getUserSeq());

//          일단 정산 전이기에 자신의 cost로 0으로 설정 // status (정산 여부도 설정)
            // 일단 맴버도 돈을 다 낸건 아니기 때문에!
            MemberEntity member = new MemberEntity(party,user,0L,false,false);
            MemberEntity newMember = memberRepository.save(member);
            memberSeq = newMember.getMemberSeq();


        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return MakePartyResponseDto.success(partySeq,memberSeq);
    }


    @Override
    public ResponseEntity<? super PartyDetailResponseDto> partyDetail(PartyDetailRequestDto dto) {
        
        Long userSeq = dto.getUserSeq();
        Long partySeq =dto.getPartySeq();

        // party리스트 넘기기
        // userSeq를 불러온 이유? 내꺼는 올라오면 안되기 때문
        List<MemberEntity> partyDetailList = memberRepositoryCustom.partyDetail(userSeq,partySeq);

        return PartyDetailResponseDto.success(partyDetailList);
    }


    @Override
    public ResponseEntity<?> partyDelete(Long partySeq) {
        partyRepository.deleteById(partySeq);
        return null;
    }

    @Override
    public ResponseEntity<? super VoidResponseDto> insertAllMember(InsertAllMemberRequestDto requestBody) {

        try {
            Long partySeq = requestBody.getPartySeq();
            PartyEntity party = partyRepository.getReferenceById(partySeq);
            int cate = party.getCategory();


            Long leaderSeq = memberRepositoryCustom.findLeaderByPartySeq(partySeq);
            UserEntity leader = userRepository.getReferenceById(leaderSeq);
            String name = leader.getUserName();


            for (InsertAllMemberRequestDto.userCost userCost : requestBody.getUserCosts()) {
                if(userCost.getUserSeq().equals(leaderSeq)) continue;
                UserEntity user = userRepository.getReferenceById(userCost.getUserSeq());
                MemberEntity member = memberRepository.save(new MemberEntity(party, user, userCost.getCost()));

                AlarmRequest alarm = new AlarmRequest();
                alarm.setBody(name.charAt(0)+"*"+name.charAt(2)+"님에게 "+userCost.getCost()+"원 TOOK!!");
                alarm.setSender(leaderSeq);
                alarm.setUserSeq(userCost.getUserSeq());
                alarm.setPartySeq(partySeq);


                if(party.getDeliveryTip()!=null) {
                    alarm.setDeliveryCost(party.getDeliveryTip()/party.getTotalMember());
                    alarm.setCost(party.getDeliveryTip()/party.getTotalMember()+member.getCost());
                }


//              배달
                if(cate==1){

                    alarm.setTitle("{배달} took 정산 요청이 왔어요!");
                    alarm.setCategory(1);


//              택시
                }else if (cate==2){

                    alarm.setTitle("{택시} took 정산 요청이 왔어요!");
                    alarm.setCategory(2);

//               공동구매
                }else if (cate==3){

                    alarm.setTitle("{공동구매} took 정산 요청이 왔어요!");
                    alarm.setCategory(3);


//               더치페이
                }else if (cate==4){

                    alarm.setTitle("{정산} took 정산 요청이 왔어요!");
                    alarm.setCategory(4);
//                  정산이니까 엔빵
                    alarm.setCost(member.getCost());

                }

                fcmService.sendNotification(alarm);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }


        return VoidResponseDto.success();
    }

//   게스트들이 송금 버튼을 눌렀을 때
    @Override
    @Transactional
    public ResponseEntity<? super ojResponseDto> onlyjungsanPay(Long partySeq,Long userSeq) {

        boolean done = false;
        BankEntity bank = null;

        try{

            MemberEntity member = memberRepositoryCustom.findMemberByPartySeqAndUserSeq(partySeq,userSeq);
            Long membercost = member.getCost();
            System.out.println("맴버가 내야할 돈은"+membercost);

            PartyEntity party = partyRepository.getReferenceById(partySeq);

//          빼주기 전에 돈 있는 없는지 검사
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            bank = bankRepository.getReferenceById(bankSeq);

            if(!bank.minus(membercost)) return ResponseDto.nomoney();

            System.out.println("맴버의 잔액이 충분합니다!!");
            System.out.println("맴버의 일련 번호"+member.getMemberSeq());
//          맴버 상태 업데이트
            memberRepositoryCustom.changeStatusBySeq(member.getMemberSeq());

//          돈빼주고 저장
            bankRepositoryCustom.updateBalanceByBankSeq(bank.getBalance(),bankSeq);

//          총 금액에서 빼주기
            Long nowtotal = party.getCost()-membercost;
            partyRepositoryCustom.updateCostBypartyId(nowtotal,partySeq);

            System.out.println("돈이 빠지고 리더에게 송금됩니다!");
//           빼주는 순간 리더에게 돈 들어가게
            Long leaderSeq = memberRepositoryCustom.findLeaderByPartySeq(partySeq);
            Long leaderBankSeq = bankRepositoryCustom.findBankSeqByUserSeq(leaderSeq);
            BankEntity leaderBankEntity = bankRepository.getReferenceById(leaderBankSeq);
            leaderBankEntity.add(membercost);
            bankRepositoryCustom.updateBalanceByBankSeq(leaderBankEntity.getBalance(),leaderBankSeq);


            System.out.println("리더에게 알림이 송금됩니다!");

            MessageRequest message = new MessageRequest();
            UserEntity sender = userRepository.getReferenceById(userSeq);
            String name = sender.getUserName();
            message.setTitle("송금 알림");
            message.setBody(name.charAt(0)+"*"+name.charAt(2)+"님이 "+membercost+"원을 송금하였습니다!");

            List<Long> lst = new ArrayList<Long>();
            lst.add(leaderSeq);

            message.setUserSeqList(lst);
            fcmService.sendMessage(message);


            System.out.println("나눠지지 않는다면 차액은 리더에게!");

            if(nowtotal.equals(membercost)){
//              정산완료
                done = true;
                partyRepositoryCustom.changeStatusBySeq(partySeq);


            }
            else if(nowtotal < membercost){

                done = true;
                Long change = membercost - nowtotal;
                leaderBankEntity.add(change);
                bankRepositoryCustom.updateBalanceByBankSeq(leaderBankEntity.getBalance(),leaderBankSeq);


                message.setTitle("송금 알림");
                message.setBody("정산이 완료되어 차액이 납부 되었습니다!");

                lst = new ArrayList<Long>();
                lst.add(leaderSeq);

                message.setUserSeqList(lst);
                fcmService.sendMessage(message);

            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ojResponseDto.success(done);
    }


    @Override
    public ResponseEntity<? super ojResponseDto> deligonguPay(Long memberSeq,Long userSeq) {

        boolean done = false;
        BankEntity bank = null;

        try{

            Long membercost = memberRepositoryCustom.findCostByMemberSeq(memberSeq);
            Long partySeq = memberRepositoryCustom.findPartySeqByMemberSeq(memberSeq);

            //해당하는 파티를 불러옴
            PartyEntity party = partyRepository.getReferenceById(partySeq);

            //빼주기 전에 돈 있는 없는지 검사
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            bank = bankRepository.getReferenceById(bankSeq);

            if(!bank.minus(membercost)) return ResponseDto.nomoney();

            // 맴버 상태 업데이트
            memberRepositoryCustom.changeStatusBySeq(memberSeq);

            // 돈빼주고 저장
            bankRepositoryCustom.updateBalanceByBankSeq(bank.getBalance(),bankSeq);

            //해당 파티에 recieve를 채움
            Long nowcost = party.getReceiveCost()+membercost;
            partyRepositoryCustom.updateCostBypartyId(nowcost,partySeq);

            //총 금액이 같아지면 이렇게 됨.
            if(nowcost.equals(party.getCost())) {
                partyRepositoryCustom.changeStatusBySeq(partySeq);
                done = true;
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ojResponseDto.success(done);
    }

    @Override
    public ResponseEntity<? super ojResponseDto> deligonguRecieve(Long partySeq,Long memberSeq) {

        boolean done = true;

        try{

            memberRepositoryCustom.changeStatusBySeq(memberSeq);

            List<MemberEntity> members = memberRepository.findAllById(Collections.singleton(partySeq));

            for(MemberEntity memberEntity : members){
                if(!memberEntity.isStatus())done = false;
            }


        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.nomoney();
        }

        return ojResponseDto.success(done);
    }

    @Override
    public ResponseEntity<? super ojResponseDto> deligonguHostRecieve(Long partySeq,Long userSeq) {

        try{


            Long recieveCost = partyRepositoryCustom.findCostByPartySeq(partySeq);

//          뱅크 가져와서 업데이트
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            BankEntity bank = bankRepository.getReferenceById(bankSeq);
            bank.add(recieveCost);
            bankRepositoryCustom.updateBalanceByBankSeq(bank.getBalance(),bankSeq);



        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ojResponseDto.success(true);
    }

    @Override
    public ResponseEntity<? super ojResponseDto> onlyjungsanRecieve(Long partySeq, Long userSeq) {

        try{

            PartyEntity party = partyRepository.getReferenceById(partySeq);
            Long N = (long) party.getTotalMember();

            Long recieveCost = party.getReceiveCost()*(N-1L)/N;

//          뱅크 가져와서 업데이트
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            BankEntity bank = bankRepository.getReferenceById(bankSeq);
            bank.add(recieveCost);
            bankRepositoryCustom.updateBalanceByBankSeq(bank.getBalance(),bankSeq);



        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ojResponseDto.success(true);
    }


}
