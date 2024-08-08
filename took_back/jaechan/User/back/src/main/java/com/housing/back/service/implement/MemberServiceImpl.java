package com.housing.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.member.MemberSaveRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.member.MemberSaveResponseDto;
import com.housing.back.entity.MemberEntity;
import com.housing.back.entity.PartyEntity;
import com.housing.back.entity.UserEntity;
import com.housing.back.repository.MemberRepository;
import com.housing.back.repository.PartyRepository;
import com.housing.back.repository.UserRepository;
import com.housing.back.service.MemberService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<? super MemberSaveResponseDto> makeMember(MemberSaveRequestDto dto) {

        // 뭔가 비효율 적인듯
        PartyEntity party = partyRepository.getReferenceById(dto.getPartySeq());
        UserEntity user = userRepository.getReferenceById(dto.getUserSeq());
        
        MemberEntity member = new MemberEntity(dto,party,user);

        try{

            memberRepository.save(member);

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return MemberSaveResponseDto.success();
    }
    

}
