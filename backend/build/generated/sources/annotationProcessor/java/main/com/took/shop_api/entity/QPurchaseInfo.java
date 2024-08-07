package com.took.shop_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPurchaseInfo is a Querydsl query type for PurchaseInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPurchaseInfo extends EntityPathBase<PurchaseInfo> {

    private static final long serialVersionUID = -1682954937L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPurchaseInfo purchaseInfo = new QPurchaseInfo("purchaseInfo");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Long> purchaseSeq = createNumber("purchaseSeq", Long.class);

    public final NumberPath<Integer> shipCost = createNumber("shipCost", Integer.class);

    public final QShop shop;

    public final com.took.user_api.entity.QUserEntity user;

    public QPurchaseInfo(String variable) {
        this(PurchaseInfo.class, forVariable(variable), INITS);
    }

    public QPurchaseInfo(Path<? extends PurchaseInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPurchaseInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPurchaseInfo(PathMetadata metadata, PathInits inits) {
        this(PurchaseInfo.class, metadata, inits);
    }

    public QPurchaseInfo(Class<? extends PurchaseInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

