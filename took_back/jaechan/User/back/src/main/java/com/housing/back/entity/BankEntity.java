package com.housing.back.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name="bank_name")
    private String bankName;

    @Column(name="account_num")
    private String accountNum;

    @Column(name="account_pwd")
    private String accountPwd;

    @Column(name="own")
    private String own;

    @Column(name="balance")
    private Long balance;

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
