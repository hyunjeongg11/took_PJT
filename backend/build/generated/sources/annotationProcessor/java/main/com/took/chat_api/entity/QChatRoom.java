package com.took.chat_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatRoom is a Querydsl query type for ChatRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRoom extends EntityPathBase<ChatRoom> {

    private static final long serialVersionUID = -1337050195L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatRoom chatRoom = new QChatRoom("chatRoom");

    public final NumberPath<Integer> category = createNumber("category", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final com.took.delivery_api.entity.QDelivery delivery;

    public final ListPath<ChatMessage, QChatMessage> messages = this.<ChatMessage, QChatMessage>createList("messages", ChatMessage.class, QChatMessage.class, PathInits.DIRECT2);

    public final NumberPath<Long> roomSeq = createNumber("roomSeq", Long.class);

    public final StringPath roomTitle = createString("roomTitle");

    public final com.took.shop_api.entity.QShop shop;

    public final com.took.taxi_api.entity.QTaxi taxi;

    public final com.took.user_api.entity.QUserEntity user;

    public final ListPath<ChatUser, QChatUser> users = this.<ChatUser, QChatUser>createList("users", ChatUser.class, QChatUser.class, PathInits.DIRECT2);

    public QChatRoom(String variable) {
        this(ChatRoom.class, forVariable(variable), INITS);
    }

    public QChatRoom(Path<? extends ChatRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatRoom(PathMetadata metadata, PathInits inits) {
        this(ChatRoom.class, metadata, inits);
    }

    public QChatRoom(Class<? extends ChatRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.delivery = inits.isInitialized("delivery") ? new com.took.delivery_api.entity.QDelivery(forProperty("delivery"), inits.get("delivery")) : null;
        this.shop = inits.isInitialized("shop") ? new com.took.shop_api.entity.QShop(forProperty("shop"), inits.get("shop")) : null;
        this.taxi = inits.isInitialized("taxi") ? new com.took.taxi_api.entity.QTaxi(forProperty("taxi"), inits.get("taxi")) : null;
        this.user = inits.isInitialized("user") ? new com.took.user_api.entity.QUserEntity(forProperty("user")) : null;
    }

}

