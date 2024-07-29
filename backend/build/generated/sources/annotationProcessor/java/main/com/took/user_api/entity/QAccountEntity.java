package com.took.user_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountEntity is a Querydsl query type for AccountEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountEntity extends EntityPathBase<AccountEntity> {

    private static final long serialVersionUID = 1352117315L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountEntity accountEntity = new QAccountEntity("accountEntity");

    public final StringPath accountName = createString("accountName");

    public final NumberPath<Long> accountSeq = createNumber("accountSeq", Long.class);

    public final QBankEntity bank;

    public final StringPath easyPwd = createString("easyPwd");

    public final BooleanPath main = createBoolean("main");

    public final QUserEntity user;

    public QAccountEntity(String variable) {
        this(AccountEntity.class, forVariable(variable), INITS);
    }

    public QAccountEntity(Path<? extends AccountEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountEntity(PathMetadata metadata, PathInits inits) {
        this(AccountEntity.class, metadata, inits);
    }

    public QAccountEntity(Class<? extends AccountEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bank = inits.isInitialized("bank") ? new QBankEntity(forProperty("bank")) : null;
        this.user = inits.isInitialized("user") ? new QUserEntity(forProperty("user")) : null;
    }

}

