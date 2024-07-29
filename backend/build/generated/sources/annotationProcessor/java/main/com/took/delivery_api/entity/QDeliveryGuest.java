package com.took.delivery_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDeliveryGuest is a Querydsl query type for DeliveryGuest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDeliveryGuest extends EntityPathBase<DeliveryGuest> {

    private static final long serialVersionUID = 870995726L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDeliveryGuest deliveryGuest = new QDeliveryGuest("deliveryGuest");

    public final QDelivery delivery;

    public final NumberPath<Long> deliveryGuestSeq = createNumber("deliveryGuestSeq", Long.class);

    public final BooleanPath pickUp = createBoolean("pickUp");

    public final com.took.user_api.entity.QUserEntity user;

    public QDeliveryGuest(String variable) {
        this(DeliveryGuest.class, forVariable(variable), INITS);
    }

    public QDeliveryGuest(Path<? extends DeliveryGuest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDeliveryGuest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDeliveryGuest(PathMetadata metadata, PathInits inits) {
        this(DeliveryGuest.class, metadata, inits);
    }

    public QDeliveryGuest(Class<? extends DeliveryGuest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.delivery = inits.isInitialized("delivery") ? new QDelivery(forProperty("delivery"), inits.get("delivery")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

