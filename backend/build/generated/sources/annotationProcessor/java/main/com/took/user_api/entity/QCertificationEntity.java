package com.took.user_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCertificationEntity is a Querydsl query type for CertificationEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCertificationEntity extends EntityPathBase<CertificationEntity> {

    private static final long serialVersionUID = 314715856L;

    public static final QCertificationEntity certificationEntity = new QCertificationEntity("certificationEntity");

    public final StringPath certificationNumber = createString("certificationNumber");

    public final StringPath email = createString("email");

    public final StringPath userId = createString("userId");

    public QCertificationEntity(String variable) {
        super(CertificationEntity.class, forVariable(variable));
    }

    public QCertificationEntity(Path<? extends CertificationEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCertificationEntity(PathMetadata metadata) {
        super(CertificationEntity.class, metadata);
    }

}

