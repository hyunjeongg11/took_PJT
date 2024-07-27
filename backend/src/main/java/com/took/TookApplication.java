package com.took;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableRedisRepositories // Redis 리포지토리 활성화
public class TookApplication {

    public static void main(String[] args) {
        SpringApplication.run(com.took.TookApplication.class, args);
    }
}
