package com.housing.back.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.member.MemberSaveRequestDto;
import com.housing.back.dto.request.party.PartyDetailRequestDto;
import com.housing.back.dto.request.party.PartyDoneRequestDto;
import com.housing.back.dto.request.party.PartyRequestDto;
import com.housing.back.dto.request.party.PayAllResquestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.member.MemberSaveResponseDto;
import com.housing.back.dto.response.party.PartyDetailResponseDto;
import com.housing.back.dto.response.party.PartyDoneResponseDto;
import com.housing.back.dto.response.party.PartyListResponseDto;
import com.housing.back.dto.response.party.PartyResponseDto;
import com.housing.back.dto.response.party.PayAllResponseDto;
import com.housing.back.entity.BankEntity;
import com.housing.back.entity.PartyEntity;
import com.housing.back.entity.MemberEntity;
import com.housing.back.repository.BankRepository;
import com.housing.back.repository.MemberRepository;
import com.housing.back.repository.PartyRepository;
import com.housing.back.repository.custom.BankRepositoryCustom;
import com.housing.back.repository.custom.MemberRepositoryCustom;
import com.housing.back.service.PartyService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService {

    private final PartyRepository partyRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final BankRepository bankRepository;
    private final MemberRepositoryCustom memberRepositoryCustom;

    @Override
    @Transactional
    public ResponseEntity<? super PartyResponseDto> makeParty(PartyRequestDto dto) {
        PartyEntity partyEntity = new PartyEntity(dto);

        try {

            partyRepository.save(partyEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PartyResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super PartyListResponseDto> listAll() {

        List<PartyEntity> list = null;
        try {
            list = partyRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PartyListResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super PayAllResponseDto> payAll(PayAllResquestDto dto) {

        Long userSeq = dto.getUserSeq();
        boolean isLeader = memberRepositoryCustom.isLeader(userSeq);

        try {

            // 멘인 결제 은행 Seq 구해오는 함수
            Long bankSeq = bankRepositoryCustom.findBankSeqByUserSeq(userSeq);
            System.out.println("뱅크 시퀀스를 출력합니다 :" + bankSeq);
            BankEntity bank = bankRepository.getReferenceById(bankSeq);

            // 리더이면 모든 금액이 빠지게
            // 그리고 상태 업데이트
            // 리더는 모든 금액을 지출 (더치페이,택시,공구,등등 동일)

            PartyEntity party = partyRepository.getReferenceById(dto.getPartySeq());
            MemberEntity member = memberRepositoryCustom.findMemberByUserSeq(dto.getUserSeq());


            if (isLeader) {

                
                int totalCost = party.getCost();
                // 통장에 잔고가 없다면
                if (!bank.minus(totalCost))
                    return ResponseDto.nomoney();

            } else {

                int guestCost = member.getCost();

                if (!bank.minus(guestCost))
                    return ResponseDto.nomoney();
            }

            // 송금이 완료 되었다면 member에 완료된 시간을 저장
            // 여기에서 돈 빠지면 저장할 수 있게
            bankRepository.save(bank);
            // 여기에서 변경 필요!
            memberRepositoryCustom.changeStatus(userSeq, true);
            

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PayAllResponseDto.success();
    }

    @Override
    public ResponseEntity<? super PartyDoneResponseDto> partyDone(PartyDoneRequestDto dto) {

        Long partySeq = dto.getPartySeq();

        try {

            List<MemberEntity> result = memberRepositoryCustom.findAllMemberByPartySeq(partySeq);
            for(MemberEntity m : result){

                if(m.isStatus()==false){
                    return PartyDoneResponseDto.success(false);
                }

            }

        } catch (Exception e) {

            e.printStackTrace();
            return ResponseDto.databaseError();

        }

        return PartyDoneResponseDto.success(true);
    }

    @Override
    public ResponseEntity<? super PartyDetailResponseDto> partyDetail(PartyDetailRequestDto dto) {
        
        Long userSeq = dto.getUserSeq();
        Long partySeq =dto.getPartySeq();

        // partyㄴ
        List<MemberEntity> partyDetailList = partyRepository.memberRepositoryCustom(userSeq,partySeq);
    }

}
