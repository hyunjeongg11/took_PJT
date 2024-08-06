package com.took.user_api.repository;


import com.took.user_api.entity.BankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<BankEntity,Long> {

    Optional<BankEntity> findById(Long bankSeq);
    
}
