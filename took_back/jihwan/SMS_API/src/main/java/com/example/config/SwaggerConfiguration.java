package com.example.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// TODO: Swagger JavaConfig 작성
// {서버주소}/swagger-ui.html로 접속

@Configuration
public class SwaggerConfiguration {

    // OpenAPI 객체 생성
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("REST API").description("<h3>REST API에 대한 문서를 제공한다.</h3>")
                .version("1.0")
                .contact(new Contact().name("SSAFY").email("ssafy@ssafy.com").url("https://edu.ssafy.com"));
        // OpenAPI 객체를 생성한다.
        return new OpenAPI().components(new Components()).info(info);
    }

    // 어떤 REST API를 문서화 할 것인지 매핑하기
    @Bean
    public GroupedOpenApi boardApi() {
        return GroupedOpenApi
                .builder()
                .group("sms")  // 그룹 이름 ( 원하는 이름으로 작성 )
                .pathsToMatch("/api/sms/**") // 경로 패턴이 일치하는 것들을 API로 인식
                .build();
    }
}
