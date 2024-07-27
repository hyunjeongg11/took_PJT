package com.housing.back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="user_seq")
    private UserEntity user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="bank_seq", nullable = false)
    private BankEntity bank;


    public AccountEntity(String accountName, Boolean main,UserEntity user, BankEntity bank){

        this.accountName = accountName;
        this.user = user;
        this.bank = bank;
        this.main = main;
    }




}
