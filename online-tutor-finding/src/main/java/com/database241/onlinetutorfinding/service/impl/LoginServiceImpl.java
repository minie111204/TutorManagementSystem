package com.database241.onlinetutorfinding.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.database241.onlinetutorfinding.entity.user.Administrator;
import com.database241.onlinetutorfinding.entity.user.SystemUser;
import com.database241.onlinetutorfinding.entity.user.Tutor;
import com.database241.onlinetutorfinding.exception.PasswordNotMatchException;
import com.database241.onlinetutorfinding.exception.ResourceNotFoundException;
import com.database241.onlinetutorfinding.repository.SystemUserRepository;
import com.database241.onlinetutorfinding.request.LoginRequest;
import com.database241.onlinetutorfinding.response.LoginResponse;
import com.database241.onlinetutorfinding.service.LoginService;
import com.database241.onlinetutorfinding.util.Util;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Autowired
    private SystemUserRepository systemUserRepository;

    @Autowired
    private Util util;

    @Override
    public LoginResponse login(LoginRequest request) {
        String phoneNumber = request.getPhoneNumber();
        String password = request.getPassword();

        Optional<SystemUser> userOpt = systemUserRepository.findByPhoneNumber(phoneNumber);

        // Kiểm tra nếu người dùng không tồn tại
        if (userOpt.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        // Lấy đối tượng người dùng từ Optional
        SystemUser user = userOpt.get();
        String role;
        if (user instanceof Administrator) {
            role = "admin";
        } else if (user instanceof Tutor) {
            role = "tutor";
        } else {
            role = "student";
        }
        // Kiểm tra mật khẩu đã mã hóa
        if (user.getPassword().equals(util.sha1Hash(password))) {
            return LoginResponse.builder().fullname(user.getFullName()).id(user.getId()).role(role)
                    .sex(user.getUserSex()).build();
        } else {
            throw new PasswordNotMatchException("Password is not match!");
        }
    }
}