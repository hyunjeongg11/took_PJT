package com.housing.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.user.KakaoChangeRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.user.KakaoChangeResponseDto;
import com.housing.back.repository.UserCustomRepository;
import com.housing.back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserCustomRepository userCustomRepository;


    @Override
    public ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(KakaoChangeRequestDto dto) {
        
        try{

            userCustomRepository.kakaoChange(dto);


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return KakaoChangeResponseDto.success();
    }
    

}
