package com.database241.onlinetutorfinding.repository;

import com.database241.onlinetutorfinding.entity.user.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemUserRepository extends JpaRepository<SystemUser, Long> {
    // Phương thức tìm người dùng theo số điện thoại
    Optional<SystemUser> findByPhoneNumber(String phoneNumber);
}
