package org.example.taxi_api.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
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
    public List<TaxiGuest> findUniqueDestinationsByTaxiSeq(Long taxiSeq) {
        QTaxiGuest taxiGuest = QTaxiGuest.taxiGuest;

        return queryFactory.select(Projections.bean(TaxiGuest.class,
                        taxiGuest.destiName,
                        taxiGuest.destiLat,
                        taxiGuest.destiLon,
                        taxiGuest.routeRank.min().as("routeRank")))
                .from(taxiGuest)
                .where(taxiGuest.taxi.taxiSeq.eq(taxiSeq))
                .groupBy(taxiGuest.routeRank)
                .fetch();
    }
}
