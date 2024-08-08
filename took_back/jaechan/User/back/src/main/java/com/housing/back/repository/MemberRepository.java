package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.housing.back.entity.MemberEntity;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,Long>{
    
}
