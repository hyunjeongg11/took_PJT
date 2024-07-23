package com.housing.back.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.housing.back.entity.UserEntity;
import com.housing.back.provider.JwtProvider;
import com.housing.back.repository.UserRepository;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


// 이 필터에서 Jwtprovidder을 사용해 준다.
@Component
@RequiredArgsConstructor  // 필수 요소에 대한 생성자 생성 | 필터로 만들기 위해서는 해당 필터를 상속하여 메서드를 재정의 해주어야한다.
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {


            try{

                String token = parseVearerToken(request);
                if(token == null){
                    filterChain.doFilter(request, response);
                    return;
                }

                String userId = jwtProvider.validate(token);

                if(userId ==null){
                    // 넘어가기
                    filterChain.doFilter(request, response);
                    return;
                }

                // 이게 진짜로 맞다면? 아이디가 정상적으로 나왔다면?
                UserEntity userEntity = userRepository.findByUserId(userId);
                String role = userEntity.getRole(); //role : 이때 role은 ROLE_USER,ROLE_ADMIN

                // ROLE_DEVELOPER ,등을 리스트로 전달 할 수 있게금 가능!
                // 다중 권한 소지자일 경우
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(role));
                
                // 빈콘텍스트 제작완
                SecurityContext securityContext =  SecurityContextHolder.createEmptyContext();

                // token제작
                AbstractAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userId, null,authorities); 
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                securityContext.setAuthentication(authenticationToken);
                SecurityContextHolder.setContext(securityContext);

            }catch(Exception exception){
                exception.printStackTrace();
            }

            filterChain.doFilter(request, response);
         
    }



//    request로 부터 bear token 값을 가져와 줘야 한다.
//    jwtpriver의 validation을 통해 검사해줘야한다.
    

    private String parseVearerToken(HttpServletRequest request){

        String authorization = request.getHeader("Authorization");
        boolean hasAuhorization = StringUtils.hasText(authorization);

        if(!hasAuhorization) return null;

        boolean isBearer = authorization.startsWith("Bearer");

        if(!isBearer) return null;

        String token = authorization.substring(7);

        return token;
    }
}