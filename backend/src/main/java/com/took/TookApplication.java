package com.took;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import java.util.TimeZone;

@SpringBootApplication
@EnableRedisRepositories // Redis 리포지토리 활성화
public class TookApplication {

    @PostConstruct
    void started(){
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

    public static void main(String[] args) {
        SpringApplication.run(com.took.TookApplication.class, args);
    }

}
