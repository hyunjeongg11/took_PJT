package com.took.config;


import com.took.filter.JwtAuthenticationFilter;
import com.took.user_api.handler.OAuth2SuccessHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;

@Configurable // @Bean을 등록할 수 있도록 해준다.
@Configuration // WebSecurityConfig 라는 친구가 bean method를 갖고 있다.
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final DefaultOAuth2UserService oAuth2UserService;
        private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    protected CorsConfigurationSource configurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // 정확한 출처만 허용
        configuration.addAllowedOrigin("https://i11e205.p.ssafy.io");
        configuration.addAllowedOrigin("http://localhost:5173");
        configuration.addAllowedOrigin("http://localhost:5174");
        configuration.addAllowedMethod("*"); // 필요에 따라 특정 메서드만 허용
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true); // 자격 증명(쿠키 등) 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

        @Bean
        protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {

            System.out.println("chain에서 확인합니다.");
                httpSecurity
                                .cors(cors -> cors
                                                .configurationSource(configurationSource()))
                                .csrf(CsrfConfigurer::disable) // 사이트 요청에 대한 설정 //JWT 기반 인증이 이뤄지 때문에 csrf를 제어!
                                .httpBasic(HttpBasicConfigurer::disable) //이것도 JWT 기반 인증이 이뤄지기 때문에 disable로 제어!
                                .sessionManagement(sessionManagement -> sessionManagement
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                // 일단 세션 안쓰게끔
                                .authorizeHttpRequests(request -> request

//                                                로그인 전에 이뤄지는 작업은 인증이 푤요하지 않다.
                                                .requestMatchers("/", "/api/auth/**","/oauth2/**").permitAll()
                                                // 접두사는 제외 하고 USER만 적어준다.w
                                                .requestMatchers("/api/user/**").hasRole("USER")
                                                .requestMatchers("/api/account/**").hasRole("USER")
                                                .requestMatchers("/api/pay/**").hasRole("USER")
                                                .requestMatchers("/api/chat/**").hasRole("USER")
                                                .requestMatchers("/api/delivery/**").hasRole("USER")
                                                .requestMatchers("/api/noti/**").hasRole("USER")
                                                .requestMatchers("/api/position/**").hasRole("USER")
                                                .requestMatchers("/api/purchase/**").hasRole("USER")
                                                .requestMatchers("/api/ship/**").hasRole("USER")
                                                .requestMatchers("/api/shops/**").hasRole("USER")
                                                .requestMatchers("/api/sms/**").hasRole("USER")
                                                .requestMatchers("/api/navi/**").hasRole("USER")
                                                .requestMatchers("/api/taxi/**").hasRole("USER")
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                                                .anyRequest().authenticated()
                                ).oauth2Login(oauth2 -> oauth2
                                        .authorizationEndpoint(endpoint -> endpoint.baseUri("/api/auth/oauth2"))
                                        .redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
                                        .userInfoEndpoint(endpoint->endpoint.userService(oAuth2UserService))
                                        .successHandler(oAuth2SuccessHandler)
                                        )
                                .exceptionHandling(exceptionHandling -> exceptionHandling
                                                .authenticationEntryPoint(new FailedAuthenticationEntryPoint()))
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return httpSecurity.build();
        }



}

// jwt인증에 실패하게 되면 위 값을 넣어주게 된다.
class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                        AuthenticationException authException)
                        throws IOException, ServletException {

                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                // {"code" : "NP" , "message" : "No Permission."}
                response.getWriter().write("{\"code\" : \"NP\" , \"message\" : \"No Permission.\"}");

        }
}