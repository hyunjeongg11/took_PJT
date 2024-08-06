package com.took.user_api.service.implement;


import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import com.took.user_api.dto.request.party.hostPayRequestDto;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.member.MemberSaveResponseDto;
import com.took.user_api.entity.BankEntity;
import com.took.user_api.entity.MemberEntity;
import com.took.user_api.entity.PartyEntity;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.BankRepository;
import com.took.user_api.repository.MemberRepository;
import com.took.user_api.repository.PartyRepository;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.repository.custom.BankRepositoryCustom;
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
    private final BankRepositoryCustom bankRepositoryCustom;



    @Override
    @Transactional
    public ResponseEntity<? super MemberSaveResponseDto> insertMember(MemberSaveRequestDto requestBody) {

        MemberEntity newMember = null;

        try{

            PartyEntity party = partyRepository.getReferenceById(requestBody.getPartySeq());
            UserEntity user = userRepository.getReferenceById(requestBody.getUserSeq());

//          정산 시작 전이므로 당연히 cost는 0에 해당
//          정산 시작 전으리므로 당연히 Status는 False
//          받는 사람을 누구로 할지 아예 안정했기 때문에 당연히 False
            MemberEntity member = new MemberEntity(party,user);
            newMember = memberRepository.save(member);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return MemberSaveResponseDto.success(newMember.getMemberSeq());
    }

    @Override
    public void delete(Long memberSeq) {
        memberRepository.deleteById(memberSeq);
    }


}
