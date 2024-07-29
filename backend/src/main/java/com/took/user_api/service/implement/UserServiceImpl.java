package com.took.user_api.service.implement;


import com.querydsl.core.Tuple;
import com.took.user_api.dto.LocationDto;
import com.took.user_api.dto.request.user.KakaoChangeRequestDto;
import com.took.user_api.dto.request.user.UserInfoRequestDto;
import com.took.user_api.dto.response.ResponseDto;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserCustomRepository userCustomRepository;
    private final TokenBlacklistService tokenBlacklistService;

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
    public ResponseEntity<? super UserInfoResponseDto> userInfo(UserInfoRequestDto requestBody) {

        UserEntity user = null;
        try{

            user = userRepository.getReferenceById(requestBody.getUserSeq());

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return UserInfoResponseDto.success(user.getUserName(), user.getPhoneNumber(), user.getUserId(), user.getEmail());
    }

    @Override
    public ResponseEntity<? super DeliNearUserResponseDto> searchNearUser(LocationDto requestBody) {

        List<Long> nearList = null;
        Double myLng;
        Double myLat;

        try{

            myLng = requestBody.getLng();
            myLat = requestBody.getLat();

//          위경도 정보 모두 불러와서 리턴
            List<Tuple> userList = userCustomRepository.getAllLocation();

            for(Tuple user : userList){

                Double lat = user.get(0, Double.class); // 첫 번째 값 (lat)
                Double lng = user.get(1, Double.class); // 두 번째 값 (lng)
                Long userSeq = user.get(2, Long.class); // 세 번째 값 (userSeq)

                double distance = calculateDistance(myLat, myLng, lat, lng);

                if(distance<=500) nearList.add(userSeq);

            }


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return DeliNearUserResponseDto.success(nearList);
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
