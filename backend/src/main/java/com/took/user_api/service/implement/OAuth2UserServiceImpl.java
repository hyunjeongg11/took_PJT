//package com.took.user_api.service.implement;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import com.took.user_api.entity.CustomOAuth2User;
//import com.took.user_api.entity.UserEntity;
//import com.took.user_api.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class OAuth2UserServiceImpl extends DefaultOAuth2UserService{
//
//    private final UserRepository userRepository;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest request)throws OAuth2AuthenticationException{
//
//        System.out.println("OAuth2UserServiceImpl을 불러옵니다.");
//        //super에서 loadUser를 통해 그 결과를 받아 볼 수 있다.
//        OAuth2User oAuth2User = super.loadUser(request);
//        String oauthClientName = request.getClientRegistration().getClientName();
//
//        try{
//            System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
//
//        }catch(Exception e){
//            System.out.println("OAuth2UserServiceImpl에서 에러를 보냅니다.");
//            e.printStackTrace();
//        }
//
//        UserEntity userEntity = null;
//        String userId = null;
//        String email = "email@email.com";
//
//        if(oauthClientName.equals("kakao")){
//            userId = "kakao_" + oAuth2User.getAttributes().get("id");
//            userEntity = new UserEntity(userId,email);
//        }
//
//        userRepository.save(userEntity);
//
//        return new CustomOAuth2User(userId);
//    }
//}
