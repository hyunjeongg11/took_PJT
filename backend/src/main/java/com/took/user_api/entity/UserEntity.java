package com.took.user_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.took.chat_api.entity.ChatRoom;
import com.took.chat_api.entity.ChatUser;
import com.took.delivery_api.entity.Delivery;
import com.took.delivery_api.entity.DeliveryGuest;
import com.took.shop_api.entity.PurchaseInfo;
import com.took.shop_api.entity.Shop;
import com.took.shop_api.entity.ShopGuest;
import com.took.taxi_api.entity.Taxi;
import com.took.taxi_api.entity.TaxiGuest;
import com.took.user_api.dto.request.auth.SignUpRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Table(name = "user")
public class UserEntity {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq; // 시퀀스를 위한 필드

    @Column(nullable = false, length = 30, unique = true)
    private String userId;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 30)
    private String userName;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false, length = 20)
    private String birth;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private LoginStatus loginStatus;

    @Column(nullable = false)
    private Boolean alarm = false;

    @Column(nullable = false, length = 50)
    private String sido = "부산광역시";

    @Column(nullable = false, length = 50)
    private String gugun = "강서구";

    @Column(nullable = false, length = 100)
    private String addr = "녹산산업중로 333(송정동)";

    @Column(nullable = false)
    private Double lat = 35.096235;

    @Column(nullable = false)
    private Double lng = 128.855274;

    @Column(nullable = false)
    private Integer imageNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, length = 10)
    private Gender gender;

    private Integer simplePassword;

    @Column(nullable = false, length = 10)
    private String role;

    // 계좌와 관계 설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<AccountEntity> accounts;

    //party member와 관계 설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<MemberEntity> members;

    // 채팅방과 관계설정
    @JsonBackReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<ChatRoom> chatRooms;

    // 채팅방 유저와 관계설정
    @JsonBackReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<ChatUser> chatUsers;

    // 배달파티와 관계설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Delivery> deliveries;

//    알림방과의 관계 설정
// 배달파티와 관계설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<AlramEntity> alrams;


    // 배달 파티 멤버와 관계설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<DeliveryGuest> deliveryGuests;

    // 택시파티와 관계설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Taxi> taxis;

    // 택시 파티 멤버와 관계설정
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<TaxiGuest> taxiGuests;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<PurchaseInfo> purchaseInfos;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Shop> shops;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<ShopGuest> shopGuests;
    
    public UserEntity(SignUpRequestDto dto) {
        this.userId = dto.getUserId();
        this.password = dto.getPassword();
         this.gender = dto.getGender();
        this.email = dto.getEmail();
        this.userName = dto.getUserName(); // SignUpRequestDto에 userName이 추가되어야 합니다.
        this.phoneNumber = dto.getPhoneNumber(); // SignUpRequestDto에 phoneNumber가 추가되어야 합니다.
        this.birth = dto.getBirth(); // SignUpRequestDto에 birth가 추가되어야 합니다.
        this.createdAt = LocalDateTime.now();
        this.loginStatus = LoginStatus.TOOK; // 기본값 설정
        this.role = "ROLE_USER";
        this.imageNo = (int)Math.random()*20+1;
    }

    public UserEntity(String userId, String email) {
        this.userId = userId;
        this.password = "kakao_oauth_password";
        this.email = email;
        this.userName = ""; // 기본값 설정
        this.phoneNumber = ""; // 기본값 설정
        this.birth = "20000101"; // 기본값 설정
        this.createdAt = LocalDateTime.now();
        this.loginStatus = LoginStatus.KAKAO;
        this.role = "ROLE_USER";
        this.imageNo = (int)Math.random()*20+1;
    }

    public UserEntity(Double lat,Double lng){
        this.lat = lat;
        this.lng = lng;
    }

    public enum LoginStatus {
        KAKAO, TOOK
    }

    public enum Gender{
      M,F
    }
}