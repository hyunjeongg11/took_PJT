package com.took.user_api.repository;


import com.took.user_api.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<AccountEntity,Long>{
    
}
