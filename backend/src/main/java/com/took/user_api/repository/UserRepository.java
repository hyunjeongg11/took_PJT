package com.took.user_api.repository;


import com.took.user_api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  
    boolean existsByUserId(String userId);
    UserEntity findByUserId(String userId);

}
