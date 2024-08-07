package com.took.user_api.service.implement;


import com.querydsl.core.Tuple;
import com.took.user_api.dto.request.user.*;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.user.DeliNearUserResponseDto;
import com.took.user_api.dto.response.user.KakaoChangeResponseDto;
import com.took.user_api.dto.response.user.UserInfoResponseDto;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.repository.custom.UserCustomRepository;
import com.took.user_api.service.TokenBlacklistService;
import com.took.user_api.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserCustomRepository userCustomRepository;
    private final TokenBlacklistService tokenBlacklistService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${distance.threshold}")
    private double distanceThreshold;


    @Override
    @Transactional
    public ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(KakaoChangeRequestDto dto) {

        try{

            userCustomRepository.kakaoChange(dto);


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return KakaoChangeResponseDto.success();
    }


    @Override
    public void logout(String accessToken, String refreshToken, HttpServletResponse response) {

        long accessTokenExpriy = tokenBlacklistService.getExpiryFromToken(accessToken);
        long refreshTokenExpriy = tokenBlacklistService.getExpiryFromToken(refreshToken);

        tokenBlacklistService.addToken(accessToken, accessTokenExpriy, TimeUnit.MILLISECONDS);
        tokenBlacklistService.addToken(refreshToken, refreshTokenExpriy, TimeUnit.MILLISECONDS);

        Cookie cookie = new Cookie("refreshToken",null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


    @Override
    public ResponseEntity<? super UserInfoResponseDto> userInfo(UserSeqRequestDto requestBody) {
        UserEntity user = null;
        try {
            user = userRepository.getReferenceById(requestBody.getUserSeq());

            // UserInfoResponseDto의 정적 팩토리 메서드를 사용하여 객체 생성
            UserInfoResponseDto response = UserInfoResponseDto.fromEntity(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return UserInfoResponseDto.success(user);
    }

    @Override
    public ResponseEntity<? super DeliNearUserResponseDto> searchNearUser(NearUserRequestDto requestBody) {

        List<Long> nearList = new ArrayList<>();
        double myLon;
        double myLat;

        try{
            myLon = requestBody.getLon();
            myLat = requestBody.getLat();

//          위경도 정보 모두 불러와서 리턴
            List<Tuple> userList = userCustomRepository.getAllLocation(requestBody.getUserSeq());

            for(Tuple user : userList){
                Double lat = user.get(0, Double.class); // 첫 번째 값 (lat)
                Double lon = user.get(1, Double.class); // 두 번째 값 (lon)
                Long userSeq = user.get(2, Long.class); // 세 번째 값 (userSeq)

                double distance = calculateDistance(myLat, myLon, lat, lon);
                if(distance<=distanceThreshold) nearList.add(userSeq);
            }


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return DeliNearUserResponseDto.success(nearList);
    }

    @Transactional
    @Override
    public ResponseEntity<? super VoidResponseDto> changePwd(PwdChangeRequestDto requestBody) {

        try{

            UserEntity user = userRepository.getReferenceById(requestBody.getUserSeq());

            boolean isMatched = passwordEncoder.matches(requestBody.getNowPwd(),user.getPassword());

            if(!isMatched){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
            }

            String encryptedPwd = passwordEncoder.encode(requestBody.getNewPwd());
            userCustomRepository.changePwd(encryptedPwd,requestBody.getUserSeq());


        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return VoidResponseDto.success();
    }

    @Transactional
    @Override
    public ResponseEntity<? super VoidResponseDto> changeAlram(UserSeqRequestDto requestBody) {

        try{

            UserEntity user = userRepository.getReferenceById(requestBody.getUserSeq());

            if(user.getAlarm()) userCustomRepository.changeAlramFalse(requestBody.getUserSeq());
            else userCustomRepository.changeAlramTrue(requestBody.getUserSeq());



        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return VoidResponseDto.success();
    }

    // GOOGLE OAUTh 떄문에 적음
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    @Transactional
    @Override
    public void setAddress(UserAddressRequestDto requestBody) {
        UserEntity user = userRepository.getReferenceById(requestBody.getUserSeq());
        user.setAddress(requestBody.getAddr(),requestBody.getLat(),requestBody.getLon());
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2))
                    + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                    * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515 * 1.609344;  // km 단위로 변환
            return (dist * 1000);  // m 단위로 변환
        }
    }


}
