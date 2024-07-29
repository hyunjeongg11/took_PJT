package com.took.user_api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserEntity is a Querydsl query type for UserEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserEntity extends EntityPathBase<UserEntity> {

    private static final long serialVersionUID = -1404807013L;

    public static final QUserEntity userEntity = new QUserEntity("userEntity");

    public final ListPath<AccountEntity, QAccountEntity> accounts = this.<AccountEntity, QAccountEntity>createList("accounts", AccountEntity.class, QAccountEntity.class, PathInits.DIRECT2);

    public final StringPath addr = createString("addr");

    public final BooleanPath alarm = createBoolean("alarm");

    public final StringPath birth = createString("birth");

    public final ListPath<com.took.chat_api.entity.ChatRoom, com.took.chat_api.entity.QChatRoom> chatRooms = this.<com.took.chat_api.entity.ChatRoom, com.took.chat_api.entity.QChatRoom>createList("chatRooms", com.took.chat_api.entity.ChatRoom.class, com.took.chat_api.entity.QChatRoom.class, PathInits.DIRECT2);

    public final ListPath<com.took.chat_api.entity.ChatUser, com.took.chat_api.entity.QChatUser> chatUsers = this.<com.took.chat_api.entity.ChatUser, com.took.chat_api.entity.QChatUser>createList("chatUsers", com.took.chat_api.entity.ChatUser.class, com.took.chat_api.entity.QChatUser.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<com.took.delivery_api.entity.Delivery, com.took.delivery_api.entity.QDelivery> deliveries = this.<com.took.delivery_api.entity.Delivery, com.took.delivery_api.entity.QDelivery>createList("deliveries", com.took.delivery_api.entity.Delivery.class, com.took.delivery_api.entity.QDelivery.class, PathInits.DIRECT2);

    public final ListPath<com.took.delivery_api.entity.DeliveryGuest, com.took.delivery_api.entity.QDeliveryGuest> deliveryGuests = this.<com.took.delivery_api.entity.DeliveryGuest, com.took.delivery_api.entity.QDeliveryGuest>createList("deliveryGuests", com.took.delivery_api.entity.DeliveryGuest.class, com.took.delivery_api.entity.QDeliveryGuest.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final EnumPath<UserEntity.Gender> gender = createEnum("gender", UserEntity.Gender.class);

    public final StringPath gugun = createString("gugun");

    public final NumberPath<Integer> imageNo = createNumber("imageNo", Integer.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final EnumPath<UserEntity.LoginStatus> loginStatus = createEnum("loginStatus", UserEntity.LoginStatus.class);

    public final ListPath<MemberEntity, QMemberEntity> members = this.<MemberEntity, QMemberEntity>createList("members", MemberEntity.class, QMemberEntity.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final ListPath<com.took.shop_api.entity.PurchaseInfo, com.took.shop_api.entity.QPurchaseInfo> purchaseInfos = this.<com.took.shop_api.entity.PurchaseInfo, com.took.shop_api.entity.QPurchaseInfo>createList("purchaseInfos", com.took.shop_api.entity.PurchaseInfo.class, com.took.shop_api.entity.QPurchaseInfo.class, PathInits.DIRECT2);

    public final StringPath role = createString("role");

    public final ListPath<com.took.shop_api.entity.ShopGuest, com.took.shop_api.entity.QShopGuest> shopGuests = this.<com.took.shop_api.entity.ShopGuest, com.took.shop_api.entity.QShopGuest>createList("shopGuests", com.took.shop_api.entity.ShopGuest.class, com.took.shop_api.entity.QShopGuest.class, PathInits.DIRECT2);

    public final ListPath<com.took.shop_api.entity.Shop, com.took.shop_api.entity.QShop> shops = this.<com.took.shop_api.entity.Shop, com.took.shop_api.entity.QShop>createList("shops", com.took.shop_api.entity.Shop.class, com.took.shop_api.entity.QShop.class, PathInits.DIRECT2);

    public final StringPath sido = createString("sido");

    public final NumberPath<Integer> simplePassword = createNumber("simplePassword", Integer.class);

    public final ListPath<com.took.taxi_api.entity.TaxiGuest, com.took.taxi_api.entity.QTaxiGuest> taxiGuests = this.<com.took.taxi_api.entity.TaxiGuest, com.took.taxi_api.entity.QTaxiGuest>createList("taxiGuests", com.took.taxi_api.entity.TaxiGuest.class, com.took.taxi_api.entity.QTaxiGuest.class, PathInits.DIRECT2);

    public final ListPath<com.took.taxi_api.entity.Taxi, com.took.taxi_api.entity.QTaxi> taxis = this.<com.took.taxi_api.entity.Taxi, com.took.taxi_api.entity.QTaxi>createList("taxis", com.took.taxi_api.entity.Taxi.class, com.took.taxi_api.entity.QTaxi.class, PathInits.DIRECT2);

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

