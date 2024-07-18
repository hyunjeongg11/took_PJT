package com.housing.back.config;

import java.io.IOException;

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

import com.housing.back.filter.JwtAuthenticationFilter;
import com.housing.back.handler.OAuth2SuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configurable // @Bean을 등록할 수 있도록 해준다.
@Configuration // WebSecurityConfig 라는 친구가 bean method를 갖고 있다.
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final DefaultOAuth2UserService oAuth2UserService;
        private final OAuth2SuccessHandler oAuth2SuccessHandler;

        @Bean
        protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {

                httpSecurity
                                .cors(cors -> cors
                                                .configurationSource(configurationSource()))
                                .csrf(CsrfConfigurer::disable) // 사이트 요청에 대한 설정
                                .httpBasic(HttpBasicConfigurer::disable)
                                .sessionManagement(sessionManagement -> sessionManagement
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                //
                                .authorizeHttpRequests(request -> request

                                                .requestMatchers("/", "/api/v1/auth/**","/oauth2/**").permitAll()
                                                // 접두사는 제외 하고 USER만 적어준다.w
                                                .requestMatchers("/api/v1/user/**").hasRole("USER")
                                                // api/v1/user/로의 접근은 역하이 USER인 것만 가능하다.
                                                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                                                // 나머지 모든 request에 대해서는 인증을 하겠다.

                                                .anyRequest().authenticated()
                                ).oauth2Login(oauth2 -> oauth2
                                        .authorizationEndpoint(endpoint -> endpoint.baseUri("/api/v1/auth/oauth2"))
                                        .redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
                                        .userInfoEndpoint(endpoint->endpoint.userService(oAuth2UserService))
                                        .successHandler(oAuth2SuccessHandler)
                                        )
                                .exceptionHandling(exceptionHandling -> exceptionHandling
                                                .authenticationEntryPoint(new FailedAuthenticationEntryPoint()))
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return httpSecurity.build();
        }

        @Bean
        protected CorsConfigurationSource configurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.addAllowedOrigin("*");
                configuration.addAllowedMethod("*");
                configuration.addAllowedHeader("*");

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);

                return source;
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