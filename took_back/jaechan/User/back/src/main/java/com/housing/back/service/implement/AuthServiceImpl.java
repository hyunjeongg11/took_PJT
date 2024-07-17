package com.housing.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.housing.back.common.CertificationNumber;
import com.housing.back.dto.request.auth.CheckCertificationRequestDto;
import com.housing.back.dto.request.auth.EmailCertificaionRequestDto;
import com.housing.back.dto.request.auth.IdCheckRequestDto;
import com.housing.back.dto.request.auth.SignUpRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.auth.CheckCertificationResponseDto;
import com.housing.back.dto.response.auth.EmailCertificationResponseDto;
import com.housing.back.dto.response.auth.IdCheckResponseDto;
import com.housing.back.dto.response.auth.SignUpResponseDto;
import com.housing.back.provider.EmailProvider;
import com.housing.back.repository.UserRepository;
import com.housing.back.service.AuthService;
import com.housing.back.entity.CertificationEntity;
import com.housing.back.entity.UserEntity;
import com.housing.back.repository.CertificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
   
    private final UserRepository userRepository;
    private final CertificationRepository certificationRepository;
    private final EmailProvider emailProvider;

    // 의존성을 주입받지 않고 외부에서 가지고 옴
    // 어떤걸 사용할지 직접 선택하기 위함.
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    
    @Override
    public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {
    
        try{

            String userId = dto.getId();
            boolean isExistId = userRepository.existsByUserId(userId);

            if(isExistId) return IdCheckResponseDto.duplicatedId();

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return IdCheckResponseDto.success();
    }

    @Override
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificaionRequestDto dto) {
       
        try{

            String userId = dto.getId();
            String email = dto.getEmail();

            boolean isExitsId = userRepository.existsByUserId(userId);

            if(isExitsId) return EmailCertificationResponseDto.duplicatedId();

            String certificationNumber = CertificationNumber.getCertificationNumber();

            boolean isSuccessed = emailProvider.sendCertificationMail(email, certificationNumber);

            if(!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

            CertificationEntity certificationEntity = new CertificationEntity(userId,email,certificationNumber);
            certificationRepository.save(certificationEntity);

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return EmailCertificationResponseDto.success();   
    }

    @Override
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto) {
      
    
        try{

            String userId = dto.getId();
            String email = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

            CertificationEntity certificationEntity = certificationRepository.findByUserId(userId);
//          이렇게 되면 인증 자체를 보내지 않은 것.
            if(certificationEntity == null) return CheckCertificationResponseDto.certificationFail();

            boolean isMatch = certificationEntity.getEmail().equals(email) && certificationEntity.getCertificationNumber().equals(certificationNumber);
            if(!isMatch) return CheckCertificationResponseDto.certificationFail();

            

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return CheckCertificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
    
    try{

        //먼저 중복 하는 가?
        String userId = dto.getId();
        boolean isExistId = userRepository.existsByUserId(userId);

        if(isExistId) return SignUpResponseDto.duplicatedId();

        String email = dto.getEmail();
        String certificationNumber = dto.getCertificationNumber();
        CertificationEntity certificationEntity = certificationRepository.findByUserId(userId);
        boolean isMatch = 
            certificationEntity.getEmail().equals(email) 
            && certificationEntity.getCertificationNumber().equals(certificationNumber);

        if(!isMatch) return SignUpResponseDto.certificationFail();

        // 받아온 비밀 번호를 암호화 시켜서 넘겨줘야한다.
        String password = dto.getPassword();
        String encodePassword = passwordEncoder.encode(password);
        dto.setPassword(encodePassword);

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);


        // 
        certificationRepository.deleteByUserId(userId);
    
    }catch(Exception e){
        e.printStackTrace();
        return ResponseDto.databaseError();
    }

    return SignUpResponseDto.success();
    }



}
