package com.took.delivery_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDelivery is a Querydsl query type for Delivery
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDelivery extends EntityPathBase<Delivery> {

    private static final long serialVersionUID = -1682708246L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDelivery delivery = new QDelivery("delivery");

    public final com.took.chat_api.entity.QChatRoom chatRoom;

    public final StringPath content = createString("content");

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<DeliveryGuest, QDeliveryGuest> deliveryGuests = this.<DeliveryGuest, QDeliveryGuest>createList("deliveryGuests", DeliveryGuest.class, QDeliveryGuest.class, PathInits.DIRECT2);

    public final NumberPath<Long> deliverySeq = createNumber("deliverySeq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> deliveryTime = createDateTime("deliveryTime", java.time.LocalDateTime.class);

    public final StringPath deliveryTip = createString("deliveryTip");

    public final DateTimePath<java.time.LocalDateTime> finishTime = createDateTime("finishTime", java.time.LocalDateTime.class);

    public final StringPath notice = createString("notice");

    public final NumberPath<Long> partySeq = createNumber("partySeq", Long.class);

    public final NumberPath<Double> pickupLat = createNumber("pickupLat", Double.class);

    public final NumberPath<Double> pickupLon = createNumber("pickupLon", Double.class);

    public final StringPath pickupPlace = createString("pickupPlace");

    public final EnumPath<Delivery.Status> status = createEnum("status", Delivery.Status.class);

    public final StringPath storeName = createString("storeName");

    public final com.took.user_api.entity.QUserEntity user;

    public QDelivery(String variable) {
        this(Delivery.class, forVariable(variable), INITS);
    }

    public QDelivery(Path<? extends Delivery> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDelivery(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDelivery(PathMetadata metadata, PathInits inits) {
        this(Delivery.class, metadata, inits);
    }

    public QDelivery(Class<? extends Delivery> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new com.took.chat_api.entity.QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

