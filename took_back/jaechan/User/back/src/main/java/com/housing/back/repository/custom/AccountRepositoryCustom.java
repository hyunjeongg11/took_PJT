package com.housing.back.repository.custom;

public interface AccountRepositoryCustom {
 
    Long FindBankSeq(Long userSeq);
    void changeMain(Long userSeq);
} 
