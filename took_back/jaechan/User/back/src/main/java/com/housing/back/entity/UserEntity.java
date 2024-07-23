package com.housing.back.entity;

import java.util.List;

import java.time.LocalDateTime;

import com.housing.back.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<AccountEntity> accounts;

    //party member와 관계 설정
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<MemberEntity> members;


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

    public enum LoginStatus {
        KAKAO, TOOK
    }

    public enum Gender{
      M,F
    }
}