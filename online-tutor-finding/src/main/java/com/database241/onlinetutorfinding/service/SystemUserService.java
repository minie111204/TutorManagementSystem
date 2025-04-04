package com.database241.onlinetutorfinding.service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.database241.onlinetutorfinding.repository.SystemUserRepository;


@Service
@RequiredArgsConstructor
public class SystemUserService {
    private final SystemUserRepository systemUserRepository;

    // public String getPasswordByPhoneNumber(String phoneNumber) {
    //     return systemUserRepository.findPasswordByPhoneNumber(phoneNumber);
    // }
}

