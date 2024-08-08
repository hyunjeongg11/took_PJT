package com.took.sms_api.repository;

import com.took.sms_api.entity.Identity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IdentityRepository extends CrudRepository<Identity, String> {
    Optional<Identity> findByPhoneNumber(String phoneNumber);
}
