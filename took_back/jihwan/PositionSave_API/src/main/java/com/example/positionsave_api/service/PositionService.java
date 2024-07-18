package com.example.positionsave_api.service;

import com.example.positionsave_api.dto.PositionCreateRequest;
import com.example.positionsave_api.dto.PositionSelectResponse;
import com.example.positionsave_api.entity.Position;
import com.example.positionsave_api.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PositionService {

    private final PositionRepository positionRepository;  // PositionRepository 객체를 주입받음

    /**
     * 위치 정보를 저장하는 메서드
     *
     * @param request 위치 정보를 담은 요청 객체 (PositionCreateRequest)
     */
    public void savePosition(PositionCreateRequest request) {
        // Position 객체 생성
        Position position = Position.builder()
                .userId(request.getUserId())  // request에서 userId 가져옴
                .lat(request.getLat())        // request에서 위도 가져옴
                .lon(request.getLon())        // request에서 경도 가져옴
                .build();

        positionRepository.save(position);  // Position 저장
    }

    /**
     * 특정 사용자의 위치 정보를 조회하는 메서드
     *
     * @param userId 조회할 사용자의 ID
     * @return 조회된 위치 정보를 담은 응답 객체 (PositionSelectResponse)
     */
    public PositionSelectResponse getPosition(String userId) {
        Position position = positionRepository.findById(userId).orElse(null);  // PositionRepository를 통해 userId로 위치 정보 조회
        if (position == null) {
            return null;  // 위치 정보가 없을 경우, null 반환 (또는 NotFoundException throw 또는 적절히 처리)
        }
        return new PositionSelectResponse(position);  // 조회된 위치 정보를 PositionSelectResponse 객체로 변환하여 반환
    }
}