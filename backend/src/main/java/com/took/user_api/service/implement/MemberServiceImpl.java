package com.took.user_api.service.implement;


import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.member.MemberSaveResponseDto;
import com.took.user_api.entity.MemberEntity;
import com.took.user_api.entity.PartyEntity;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.MemberRepository;
import com.took.user_api.repository.PartyRepository;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

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

    @Override
    public ResponseEntity<? super MemberSaveResponseDto> insertMember(MemberSaveRequestDto requestBody) {

        MemberEntity newMember = null;

        try{

            PartyEntity party = partyRepository.getReferenceById(requestBody.getPartySeq());
            UserEntity user = userRepository.getReferenceById(requestBody.getUserSeq());
            MemberEntity member = new MemberEntity(party,user,requestBody.getCost(),requestBody.isStatus(),requestBody.isReceive());
            newMember = memberRepository.save(member);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return MemberSaveResponseDto.success(newMember.getMemberSeq());
    }


}
