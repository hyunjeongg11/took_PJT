package com.example.repository;

import com.example.domain.Identity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IdentityRepository extends JpaRepository<Identity, Integer> {
    Optional<Identity> findByPhoneNumber(String phoneNumber);
}
