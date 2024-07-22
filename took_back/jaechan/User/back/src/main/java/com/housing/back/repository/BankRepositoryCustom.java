package com.housing.back.repository;

import com.housing.back.entity.BankEntity;

public interface BankRepositoryCustom {
    
    BankEntity isMatched(String accountNum,String accountPwd);
}
