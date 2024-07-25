package com.took.util;

import jakarta.annotation.PostConstruct;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Component
public class ApiUtil {

    @Value("${kakao.api.key}")
    private static String KAKAO_API_KEY;

    @Value("${sms.api.key}")
    private static String apiKey;

    @Value("${sms.api.secret}")
    private static String apiSecret;

    public static String getKakaoApiKey() {
        return KAKAO_API_KEY;
    }

    public static String generateSignature() throws Exception {
        String salt = UUID.randomUUID().toString().replaceAll("-", "");
        String date = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];

        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(apiSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        String signature = new String(Hex.encodeHex(sha256_HMAC.doFinal((date + salt).getBytes(StandardCharsets.UTF_8))));
        return "HMAC-SHA256 ApiKey=" + apiKey + ", Date=" + date + ", salt=" + salt + ", signature=" + signature;
    }
}
