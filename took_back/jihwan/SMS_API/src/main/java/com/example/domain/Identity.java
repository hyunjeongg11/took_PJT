package com.example.domain;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Identity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "identity_idx", updatable = false)
    private int identityIdx;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "code", nullable = false)
    private int code;


    @Builder // 빌더 패턴을 사용하여 객체를 생성할 수 있는 빌더 메서드를 자동으로 생성하는 애노테이션
    public Identity(String phoneNumber, int code) {
        this.phoneNumber = phoneNumber;
        this.code = code;
    }

    // 엔티티의 필드 값을 업데이트하는 메서드
    public void update(String phoneNumber, int code) {
        this.phoneNumber = phoneNumber;
        this.code = code;
    }

}


