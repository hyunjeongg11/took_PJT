package com.took.taxi_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTaxiGuest is a Querydsl query type for TaxiGuest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTaxiGuest extends EntityPathBase<TaxiGuest> {

    private static final long serialVersionUID = -837948614L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTaxiGuest taxiGuest = new QTaxiGuest("taxiGuest");

    public final NumberPath<Integer> cost = createNumber("cost", Integer.class);

    public final NumberPath<Double> destiLat = createNumber("destiLat", Double.class);

    public final NumberPath<Double> destiLon = createNumber("destiLon", Double.class);

    public final StringPath destiName = createString("destiName");

    public final NumberPath<Long> guestSeq = createNumber("guestSeq", Long.class);

    public final NumberPath<Integer> routeRank = createNumber("routeRank", Integer.class);

    public final QTaxi taxi;

    public final com.took.user_api.entity.QUserEntity user;

    public QTaxiGuest(String variable) {
        this(TaxiGuest.class, forVariable(variable), INITS);
    }

    public QTaxiGuest(Path<? extends TaxiGuest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTaxiGuest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTaxiGuest(PathMetadata metadata, PathInits inits) {
        this(TaxiGuest.class, metadata, inits);
    }

    public QTaxiGuest(Class<? extends TaxiGuest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.taxi = inits.isInitialized("taxi") ? new QTaxi(forProperty("taxi"), inits.get("taxi")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

