package com.took.user_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPartyEntity is a Querydsl query type for PartyEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPartyEntity extends EntityPathBase<PartyEntity> {

    private static final long serialVersionUID = -1772165380L;

    public static final QPartyEntity partyEntity = new QPartyEntity("partyEntity");

    public final NumberPath<Integer> category = createNumber("category", Integer.class);

    public final NumberPath<Long> cost = createNumber("cost", Long.class);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> partySeq = createNumber("partySeq", Long.class);

    public final NumberPath<Long> receiveCost = createNumber("receiveCost", Long.class);

    public final BooleanPath status = createBoolean("status");

    public final StringPath title = createString("title");

    public final NumberPath<Integer> totalMember = createNumber("totalMember", Integer.class);

    public QPartyEntity(String variable) {
        super(PartyEntity.class, forVariable(variable));
    }

    public QPartyEntity(Path<? extends PartyEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPartyEntity(PathMetadata metadata) {
        super(PartyEntity.class, metadata);
    }

}

