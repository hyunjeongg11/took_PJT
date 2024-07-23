package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.housing.back.entity.BankEntity;

@Repository
public interface BankRepository extends JpaRepository<BankEntity,Long>{
    
}
