package com.took.user_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBankEntity is a Querydsl query type for BankEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBankEntity extends EntityPathBase<BankEntity> {

    private static final long serialVersionUID = 1386224204L;

    public static final QBankEntity bankEntity = new QBankEntity("bankEntity");

    public final StringPath accountNum = createString("accountNum");

    public final StringPath accountPwd = createString("accountPwd");

    public final ListPath<AccountEntity, QAccountEntity> accounts = this.<AccountEntity, QAccountEntity>createList("accounts", AccountEntity.class, QAccountEntity.class, PathInits.DIRECT2);

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final StringPath bankName = createString("bankName");

    public final NumberPath<Long> bankSeq = createNumber("bankSeq", Long.class);

    public final StringPath own = createString("own");

    public QBankEntity(String variable) {
        super(BankEntity.class, forVariable(variable));
    }

    public QBankEntity(Path<? extends BankEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBankEntity(PathMetadata metadata) {
        super(BankEntity.class, metadata);
    }

}

