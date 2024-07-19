package com.example.positionsave_api.controller;

import  com.example.positionsave_api.dto.PositionCreateRequest;
import com.example.positionsave_api.dto.PositionSelectResponse;
import com.example.positionsave_api.dto.PositionUserListRequest;
import com.example.positionsave_api.dto.PositionUserListResponse;
import com.example.positionsave_api.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/position")
@RequiredArgsConstructor
public class PositionController {

    private final PositionService positionService;  // PositionService 객체를 주입받음

    /**
     * 위치 정보를 저장하는 API 엔드포인트
     * POST /api/position/save
     *
     * @param request 위치 정보를 담은 요청 객체 (PositionCreateRequest)
     * @return HTTP 상태 코드 204 No Content 응답
     */
    @PostMapping("/save")
    public ResponseEntity<?> savePosition(@RequestBody PositionCreateRequest request) {
        positionService.savePosition(request);  // PositionService를 통해 위치 정보 저장
        return ResponseEntity.noContent().build();  // HTTP 204 No Content 응답 반환
    }

    /**
     * 특정 사용자의 위치 정보를 조회하는 API 엔드포인트
     * GET /api/position/{userId}
     *
     * @param userSeq 조회할 사용자의 인덱스번호
     * @return HTTP 상태 코드 200 OK와 조회된 위치 정보를 담은 응답 객체 (PositionSelectResponse)
     */
    @GetMapping("/{userSeq}")
    public ResponseEntity<?> getPosition(@PathVariable(name = "userSeq") Long userSeq) {
        PositionSelectResponse position = positionService.getPosition(userSeq);  // PositionService를 통해 위치 정보 조회
        return ResponseEntity.ok(position);  // HTTP 200 OK와 조회된 위치 정보 반환
    }

    @PostMapping("/nearby")
    public ResponseEntity<List<PositionUserListResponse>> getNearbyUsers(@RequestBody PositionUserListRequest request) {
        List<PositionUserListResponse> list = positionService.getNearbyUsers(request);
        return ResponseEntity.ok(list);
    }
}