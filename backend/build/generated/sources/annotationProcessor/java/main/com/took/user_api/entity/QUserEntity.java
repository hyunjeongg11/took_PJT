package com.took.user_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserEntity is a Querydsl query type for UserEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserEntity extends EntityPathBase<UserEntity> {

    private static final long serialVersionUID = -1404807013L;

    public static final QUserEntity userEntity = new QUserEntity("userEntity");

    public final StringPath addr = createString("addr");

    public final BooleanPath alarm = createBoolean("alarm");

    public final StringPath birth = createString("birth");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final EnumPath<UserEntity.Gender> gender = createEnum("gender", UserEntity.Gender.class);

    public final StringPath gugun = createString("gugun");

    public final NumberPath<Integer> imageNo = createNumber("imageNo", Integer.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final EnumPath<UserEntity.LoginStatus> loginStatus = createEnum("loginStatus", UserEntity.LoginStatus.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath role = createString("role");

    public final StringPath sido = createString("sido");

    public final NumberPath<Integer> simplePassword = createNumber("simplePassword", Integer.class);

    public final StringPath userId = createString("userId");

    public final StringPath userName = createString("userName");

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public QUserEntity(String variable) {
        super(UserEntity.class, forVariable(variable));
    }

    public QUserEntity(Path<? extends UserEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserEntity(PathMetadata metadata) {
        super(UserEntity.class, metadata);
    }

}

