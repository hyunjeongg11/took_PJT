package com.took.shop_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShipInfo is a Querydsl query type for ShipInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QShipInfo extends EntityPathBase<ShipInfo> {

    private static final long serialVersionUID = 617652482L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShipInfo shipInfo = new QShipInfo("shipInfo");

    public final StringPath courier = createString("courier");

    public final StringPath invoiceNum = createString("invoiceNum");

    public final NumberPath<Long> shipSeq = createNumber("shipSeq", Long.class);

    public final QShop shop;

    public QShipInfo(String variable) {
        this(ShipInfo.class, forVariable(variable), INITS);
    }

    public QShipInfo(Path<? extends ShipInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShipInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShipInfo(PathMetadata metadata, PathInits inits) {
        this(ShipInfo.class, metadata, inits);
    }

    public QShipInfo(Class<? extends ShipInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
    }

}

