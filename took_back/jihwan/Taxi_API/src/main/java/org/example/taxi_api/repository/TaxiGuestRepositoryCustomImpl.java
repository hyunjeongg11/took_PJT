package org.example.taxi_api.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.example.taxi_api.entity.QTaxiGuest;
import org.example.taxi_api.entity.TaxiGuest;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository  // 이 클래스가 Spring의 Repository 빈으로 등록됨을 나타냅니다.
@RequiredArgsConstructor  // Lombok을 사용하여 모든 final 필드를 매개변수로 가지는 생성자를 자동으로 생성합니다.
public class TaxiGuestRepositoryCustomImpl implements TaxiGuestRepositoryCustom {

    private final JPAQueryFactory queryFactory;  // JPAQueryFactory를 통해 데이터베이스 작업을 처리합니다.

    /**
     * 특정 택시의 다음 목적지 순위를 조회합니다.
     * @param taxiSeq 택시 번호
     * @return 다음 목적지 순위
     */
    @Override
    public int findNextRankByTaxiSeq(Long taxiSeq) {
        QTaxiGuest taxiGuest = QTaxiGuest.taxiGuest;

        Integer maxRank = queryFactory.select(taxiGuest.routeRank.max())
                .from(taxiGuest)
                .where(taxiGuest.taxi.taxiSeq.eq(taxiSeq))
                .fetchOne();

        return maxRank != null ? maxRank + 1 : 1;
    }

    /**
     * 특정 택시의 경로를 순위별로 조회합니다.
     * @param taxiSeq 택시 번호
     * @return 경로 목록
     */
    @Override
    public List<TaxiGuest> findDestinationsByTaxiSeqOrderedByRouteRank(Long taxiSeq) {
        QTaxiGuest taxiGuest = QTaxiGuest.taxiGuest;

        return queryFactory.select(Projections.fields(TaxiGuest.class,
                        taxiGuest.userSeq,
                        taxiGuest.destiName,
                        taxiGuest.destiLat,
                        taxiGuest.destiLon,
                        taxiGuest.routeRank,
                        taxiGuest.cost))
                .from(taxiGuest)
                .where(taxiGuest.taxi.taxiSeq.eq(taxiSeq))
                .orderBy(taxiGuest.routeRank.asc())
                .fetch();
    }

    /**
     * 특정 사용자가 참가했는지 확인합니다.
     * @param userSeq 사용자 번호
     * @return 탑승 여부
     */
    @Override
    public boolean existsByUserSeq(Long userSeq) {
        QTaxiGuest taxiGuest = QTaxiGuest.taxiGuest;

        Integer result = queryFactory.selectOne()
                .from(taxiGuest)
                .where(taxiGuest.userSeq.eq(userSeq))
                .fetchFirst(); // fetchFirst()는 결과가 없으면 null을 반환

        return result != null;
    }
}
