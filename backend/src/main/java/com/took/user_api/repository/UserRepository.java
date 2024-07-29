package com.took.user_api.repository;


import com.took.user_api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserSeq(Long userSeq);
    boolean existsByUserId(String userId);
    UserEntity findByUserId(String userId);
    List<UserEntity> findByUserSeqIn(List<Long> userSeqs);
}
