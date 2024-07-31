package com.took.user_api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "bank")
@Table(name = "bank")
public class BankEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bankSeq;

    @Column(name="bank_num")
    private int bankNum;

    @Column(name="account_num")
    private String accountNum;

    @Column(name="account_pwd")
    private String accountPwd;

    @Column(name="own")
    private String own;

    @Column(name="balance")
    private Long balance;

    @Column(name="is_bank")
    private boolean isBank;

    @JsonManagedReference
    @OneToMany(mappedBy = "bank", cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<AccountEntity> accounts;

    public boolean minus(int money){

        if(this.balance >= money){
            this.balance-=money;
            return true;
        }

        return false;
    }

    public void plus(int money){
        this.balance+=money;
    }

}
