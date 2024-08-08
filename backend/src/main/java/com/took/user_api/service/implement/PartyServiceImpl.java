package com.took.user_api.service.implement;


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

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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


    @Override
    public ResponseEntity<? super MakePartyResponseDto> makeParty(MakePartyRequestDto dto) {

        Long partySeq = null;
        Long memberSeq = null;

        try{

            PartyEntity party = new PartyEntity(dto.getTitle(),dto.getCategory(),dto.getCost(),dto.getTotalMember());
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

            for (InsertAllMemberRequestDto.userCost userCost : requestBody.getUserCosts()) {
                UserEntity user = userRepository.getReferenceById(userCost.getUserSeq());
                memberRepository.save(new MemberEntity(party, user, userCost.getCost()));

            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return VoidResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super ojResponseDto> onlyjungsanPay(Long memberSeq,Long userSeq) {

        boolean done = false;
        BankEntity bank = null;

        try{

            Long membercost = memberRepositoryCustom.findCostByMemberSeq(memberSeq);
            Long partySeq = memberRepositoryCustom.findPartySeqByMemberSeq(memberSeq);
            PartyEntity party = partyRepository.getReferenceById(partySeq);

//          빼주기 전에 돈 있는 없는지 검사
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            bank = bankRepository.getReferenceById(bankSeq);

            if(!bank.minus(membercost)) return ResponseDto.nomoney();

//          맴버 상태 업데이트
            memberRepositoryCustom.changeStatusBySeq(memberSeq);

//          돈빼주고 저장
            bankRepositoryCustom.updateBalanceByBankSeq(bank.getBalance(),bankSeq);

//          총 금액에서 빼주기
            Long nowtotal = party.getCost()-membercost;
            partyRepositoryCustom.updateCostBypartyId(nowtotal,partySeq);

            if(nowtotal.equals(membercost)){
                done = true;
                partyRepositoryCustom.changeStatusBySeq(partySeq);
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
