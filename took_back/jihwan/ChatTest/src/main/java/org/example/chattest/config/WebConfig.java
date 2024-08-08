package org.example.chattest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS 설정을 추가하는 메서드
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 경로에 대해 CORS를 허용
                .allowedOrigins("*")  // 모든 출처에서의 접근을 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메서드 설정
                .allowedHeaders("Authorization", "Content-Type")  // 허용할 HTTP 헤더 설정
                .exposedHeaders("Custom-Header")  // 클라이언트에게 노출할 HTTP 헤더 설정
                .maxAge(3600);  // CORS preflight 요청의 캐시 시간을 3600초(1시간)으로 설정
    }
}
