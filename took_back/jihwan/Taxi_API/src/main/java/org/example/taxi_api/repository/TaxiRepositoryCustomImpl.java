package org.example.taxi_api.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.example.taxi_api.entity.QTaxi;
import org.example.taxi_api.entity.Taxi;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TaxiRepositoryCustomImpl implements TaxiRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Taxi> findTaxisByUserSeqs(List<Long> userSeqs) {
        QTaxi taxi = QTaxi.taxi;

        return queryFactory.selectFrom(taxi)
                .where(taxi.userSeq.in(userSeqs))
                .fetch();
    }
}
