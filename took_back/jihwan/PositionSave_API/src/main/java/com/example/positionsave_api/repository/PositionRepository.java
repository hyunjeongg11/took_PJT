package com.example.positionsave_api.repository;

import com.example.positionsave_api.entity.Position;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends CrudRepository<Position, String> {
    // 추가적인 메서드가 필요한 경우 여기에 정의할 수 있습니다.
}