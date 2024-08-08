package com.took.user_api.entity;

import jakarta.persistence.*;
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

    @Column(name="bank_num")
    private int bankNum;

    @Column(name="account_num")
    private String accountNum;

    @Column(name="account_pwd")
    private int accountPwd;

    @Column(name="own")
    private String own;

    @Column(name="balance")
    private Long balance;

    @Column(name="is_bank")
    private boolean isBank;

    public boolean minus(Long money){

        if(this.balance >= money){
            this.balance-=money;
            return true;
        }
        return false;
    }

    public void updateBalance(long balance) {
        this.balance = balance;
    }
}
