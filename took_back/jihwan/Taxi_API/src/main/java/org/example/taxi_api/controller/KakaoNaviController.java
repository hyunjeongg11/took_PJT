package org.example.taxi_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.dto.AllExpectCostRequest;
import org.example.taxi_api.dto.AllExpectCostResponse;
import org.example.taxi_api.dto.ExpectCostRequest;
import org.example.taxi_api.dto.ExpectCostResponse;
import org.example.taxi_api.service.KakaoNaviService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냅니다.
@RequiredArgsConstructor // Lombok을 사용하여 final 필드에 대해 생성자를 자동으로 생성합니다.
@RequestMapping("/api/navi") // 이 컨트롤러의 기본 URL 경로를 "/api/navi"로 설정합니다.
public class KakaoNaviController {

    private final KakaoNaviService kakaoNaviService;

    /**
     * 예상 비용을 계산합니다.
     * @param request 예상 비용 계산을 위한 요청 데이터 (출발지와 도착지의 위도와 경도)
     * @return 예상 비용 응답 데이터 (택시 비용 + 톨 비용)
     * @throws Exception 예외가 발생할 경우
     */
    @PostMapping("/expect")
    public ResponseEntity<ExpectCostResponse> calculateCost(@RequestBody ExpectCostRequest request) throws Exception {
        ExpectCostResponse response = kakaoNaviService.calculateCost(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 모든 사용자의 예상 비용을 계산합니다.
     * @param request 경로와 사용자들의 비용 정보가 담긴 요청 데이터
     * @return 사용자들의 비용 정보가 담긴 응답 데이터
     * @throws Exception 예외가 발생할 경우
     */
    @PostMapping("/expect/all")
    public ResponseEntity<AllExpectCostResponse> calculateAllCost(@RequestBody AllExpectCostRequest request) throws Exception {
        AllExpectCostResponse response = kakaoNaviService.calculateAllCost(request);
        return ResponseEntity.ok(response);
    }
}
