package org.example.taxi_api.util;


import org.ini4j.Ini;

import java.io.FileNotFoundException;
import java.io.InputStream;


public class ApiUtil {

    public static String getKakaoApiKey() throws Exception {
        // ClassLoader를 사용하여 리소스 파일 읽기
        ClassLoader classLoader = ApiUtil.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream("config.ini");
        if (inputStream == null) {
            throw new FileNotFoundException("config.ini 파일을 찾을 수 없습니다.");
        }

        Ini ini = new Ini(inputStream);
        return ini.get("AUTH", "KakaoApiKey");
    }
}
