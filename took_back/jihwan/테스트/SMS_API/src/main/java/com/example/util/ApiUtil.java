package com.example.util;

import org.apache.commons.codec.binary.Hex;
import org.ini4j.Ini;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

public class ApiUtil {

    public static String generateSignature() throws Exception {
        // ClassLoader를 사용하여 리소스 파일 읽기
        ClassLoader classLoader = ApiUtil.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream("config.ini");
        if (inputStream == null) {
            throw new FileNotFoundException("config.ini 파일을 찾을 수 없습니다.");
        }

        Ini ini = new Ini(inputStream);
        String apiKey = ini.get("AUTH", "ApiKey");
        String apiSecret = ini.get("AUTH", "ApiSecret");
        String salt = UUID.randomUUID().toString().replaceAll("-", "");
        String date = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];

        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(apiSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        String signature = new String(Hex.encodeHex(sha256_HMAC.doFinal((date + salt).getBytes(StandardCharsets.UTF_8))));
        return "HMAC-SHA256 ApiKey=" + apiKey + ", Date=" + date + ", salt=" + salt + ", signature=" + signature;
    }
}
