package org.example.taxi_api.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.example.taxi_api.entity.QTaxiGuest;
import org.example.taxi_api.entity.TaxiGuest;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TaxiGuestRepositoryCustomImpl implements TaxiGuestRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public int findNextRankByTaxiSeq(Long taxiSeq) {
        QTaxiGuest taxiGuest = QTaxiGuest.taxiGuest;

        Integer maxRank = queryFactory.select(taxiGuest.routeRank.max())
                .from(taxiGuest)
                .where(taxiGuest.taxi.taxiSeq.eq(taxiSeq))
                .fetchOne();

        return maxRank != null ? maxRank + 1 : 1;
    }

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

