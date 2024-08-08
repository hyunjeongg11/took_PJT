package org.example.taxi_api.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.example.taxi_api.entity.QTaxi;
import org.example.taxi_api.entity.Taxi;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository  // 이 클래스가 Spring의 Repository 빈으로 등록됨을 나타냅니다.
@RequiredArgsConstructor  // Lombok을 사용하여 모든 final 필드를 매개변수로 가지는 생성자를 자동으로 생성합니다.
public class TaxiRepositoryCustomImpl implements TaxiRepositoryCustom {

    private final JPAQueryFactory queryFactory;  // JPAQueryFactory를 통해 데이터베이스 작업을 처리합니다.

    /**
     * 특정 사용자들의 택시 목록을 조회합니다.
     * @param userSeqs 사용자 번호 리스트
     * @return 사용자들의 택시 목록
     */
    @Override
    public List<Taxi> findTaxisByUserSeqs(List<Long> userSeqs) {
        QTaxi taxi = QTaxi.taxi;

        return queryFactory.selectFrom(taxi)
                .where(taxi.userSeq.in(userSeqs))
                .fetch();
    }
}
