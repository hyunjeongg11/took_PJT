package com.took.user_api.service.implement;


import com.took.user_api.dto.request.party.PartyDetailRequestDto;
import com.took.user_api.dto.request.party.PartyDoneRequestDto;
import com.took.user_api.dto.request.party.makePartyRequestDto;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.party.*;
import com.took.user_api.entity.MemberEntity;
import com.took.user_api.entity.PartyEntity;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.BankRepository;
import com.took.user_api.repository.PartyRepository;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.repository.custom.BankRepositoryCustom;
import com.took.user_api.repository.custom.MemberRepositoryCustom;
import com.took.user_api.service.PartyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService {

    private final PartyRepository partyRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final BankRepository bankRepository;
    private final MemberRepositoryCustom memberRepositoryCustom;
    private final UserRepository userRepository;


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

        // party리스트 넘기기
        // userSeq를 불러온 이유? 내꺼는 올라오면 안되기 때문
        List<MemberEntity> partyDetailList = memberRepositoryCustom.partyDetail(userSeq,partySeq);

        return PartyDetailResponseDto.success(partyDetailList);
    }

    @Override
    public ResponseEntity<? super VoidResponseDto> makeParty(makePartyRequestDto dto) {

        try{

            PartyEntity party = new PartyEntity(dto.getTitle(),dto.getCategory(),dto.getCost(),dto.getTotalMember());
            PartyEntity newparty = partyRepository.save(party);
            UserEntity user = userRepository.getReferenceById(dto.getUserSeq());

//          일단 정산 전이기에 자신의 cost로 0으로 설정
            MemberEntity member = new MemberEntity(party,user,0);


        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return VoidResponseDto.success();
    }

}
