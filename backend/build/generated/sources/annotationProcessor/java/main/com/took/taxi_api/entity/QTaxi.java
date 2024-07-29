package com.took.taxi_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTaxi is a Querydsl query type for Taxi
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTaxi extends EntityPathBase<Taxi> {

    private static final long serialVersionUID = 588736830L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTaxi taxi = new QTaxi("taxi");

    public final com.took.chat_api.entity.QChatRoom chatRoom;

    public final NumberPath<Integer> cost = createNumber("cost", Integer.class);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> finishTime = createDateTime("finishTime", java.time.LocalDateTime.class);

    public final BooleanPath gender = createBoolean("gender");

    public final NumberPath<Long> master = createNumber("master", Long.class);

    public final NumberPath<Integer> max = createNumber("max", Integer.class);

    public final NumberPath<Long> partySeq = createNumber("partySeq", Long.class);

    public final NumberPath<Double> startLat = createNumber("startLat", Double.class);

    public final NumberPath<Double> startLon = createNumber("startLon", Double.class);

    public final EnumPath<Taxi.Status> status = createEnum("status", Taxi.Status.class);

    public final ListPath<TaxiGuest, QTaxiGuest> taxiGuests = this.<TaxiGuest, QTaxiGuest>createList("taxiGuests", TaxiGuest.class, QTaxiGuest.class, PathInits.DIRECT2);

    public final NumberPath<Long> taxiSeq = createNumber("taxiSeq", Long.class);

    public final com.took.user_api.entity.QUserEntity user;

    public QTaxi(String variable) {
        this(Taxi.class, forVariable(variable), INITS);
    }

    public QTaxi(Path<? extends Taxi> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTaxi(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTaxi(PathMetadata metadata, PathInits inits) {
        this(Taxi.class, metadata, inits);
    }

    public QTaxi(Class<? extends Taxi> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new com.took.chat_api.entity.QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

