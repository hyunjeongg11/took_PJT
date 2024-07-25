package com.took.taxi_api.util;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiUtil {

    public static String KAKAO_API_KEY;

    @Value("${kakao.api.key}")
    public void setKakaoApiKey(String apiKey) {
        KAKAO_API_KEY = apiKey;
    }

    public static String getKakaoApiKey() {
        return KAKAO_API_KEY;
    }
}
