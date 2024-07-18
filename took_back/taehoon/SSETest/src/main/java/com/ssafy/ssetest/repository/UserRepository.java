package com.ssafy.ssetest.repository;

import com.ssafy.ssetest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
