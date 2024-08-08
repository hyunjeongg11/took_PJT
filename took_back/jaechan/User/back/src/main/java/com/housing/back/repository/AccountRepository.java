package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.housing.back.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity,Long>{
    
}
