package com.took.shop_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShopGuest is a Querydsl query type for ShopGuest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QShopGuest extends EntityPathBase<ShopGuest> {

    private static final long serialVersionUID = -1299193974L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShopGuest shopGuest = new QShopGuest("shopGuest");

    public final BooleanPath pickUp = createBoolean("pickUp");

    public final QShop shop;

    public final NumberPath<Long> shopGuestSeq = createNumber("shopGuestSeq", Long.class);

    public final com.took.user_api.entity.QUserEntity user;

    public QShopGuest(String variable) {
        this(ShopGuest.class, forVariable(variable), INITS);
    }

    public QShopGuest(Path<? extends ShopGuest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShopGuest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShopGuest(PathMetadata metadata, PathInits inits) {
        this(ShopGuest.class, metadata, inits);
    }

    public QShopGuest(Class<? extends ShopGuest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

