package com.housing.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.member.MemberSaveRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.member.MemberSaveResponseDto;
import com.housing.back.entity.BankEntity;
import com.housing.back.entity.MemberEntity;
import com.housing.back.entity.PartyEntity;
import com.housing.back.entity.UserEntity;
import com.housing.back.repository.AccountRepository;
import com.housing.back.repository.BankRepository;
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
    private final BankRepository bankRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public ResponseEntity<? super MemberSaveResponseDto> makeMember(MemberSaveRequestDto dto) {

        // 뭔가 비효율 적인듯
        PartyEntity party = partyRepository.getReferenceById(dto.getParty_seq());
        UserEntity user = userRepository.getReferenceById(dto.getUser_seq());

        // 여기에서 바로 돈 빼기
        
        Long userSeq = user.getUserSeq();

        

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
