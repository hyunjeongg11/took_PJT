package com.took.shop_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShop is a Querydsl query type for Shop
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QShop extends EntityPathBase<Shop> {

    private static final long serialVersionUID = 648151790L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShop shop = new QShop("shop");

    public final com.took.chat_api.entity.QChatRoom chatRoom;

    public final StringPath content = createString("content");

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createAt = createDateTime("createAt", java.time.LocalDateTime.class);

    public final NumberPath<Integer> hit = createNumber("hit", Integer.class);

    public final StringPath item = createString("item");

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lon = createNumber("lon", Double.class);

    public final NumberPath<Integer> maxCount = createNumber("maxCount", Integer.class);

    public final StringPath place = createString("place");

    public final ListPath<PurchaseInfo, QPurchaseInfo> purchaseInfos = this.<PurchaseInfo, QPurchaseInfo>createList("purchaseInfos", PurchaseInfo.class, QPurchaseInfo.class, PathInits.DIRECT2);

    public final ListPath<ShipInfo, QShipInfo> shipInfos = this.<ShipInfo, QShipInfo>createList("shipInfos", ShipInfo.class, QShipInfo.class, PathInits.DIRECT2);

    public final ListPath<ShopGuest, QShopGuest> shopGuests = this.<ShopGuest, QShopGuest>createList("shopGuests", ShopGuest.class, QShopGuest.class, PathInits.DIRECT2);

    public final NumberPath<Long> shopSeq = createNumber("shopSeq", Long.class);

    public final StringPath site = createString("site");

    public final EnumPath<Shop.statusType> status = createEnum("status", Shop.statusType.class);

    public final StringPath title = createString("title");

    public final com.took.user_api.entity.QUserEntity user;

    public QShop(String variable) {
        this(Shop.class, forVariable(variable), INITS);
    }

    public QShop(Path<? extends Shop> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShop(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShop(PathMetadata metadata, PathInits inits) {
        this(Shop.class, metadata, inits);
    }

    public QShop(Class<? extends Shop> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new com.took.chat_api.entity.QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

