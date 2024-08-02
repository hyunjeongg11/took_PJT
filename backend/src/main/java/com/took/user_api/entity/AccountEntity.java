package com.took.user_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "account")
@Table(name = "account")
public class AccountEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountSeq;

    @Column(name="account_name")
    private String accountName;

    @Column(name = "main")
    private Boolean main;

    @Column(name="easyPwd",nullable=false)
    private String easyPwd;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="user_seq")
    private UserEntity user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="bank_seq", nullable = false)
    private BankEntity bank;


    public AccountEntity(String accountName, Boolean main,UserEntity user, BankEntity bank,String easyPwd){

        this.accountName = accountName;
        this.user = user;
        this.bank = bank;
        this.main = main;
        this.easyPwd = easyPwd;

    }




}
