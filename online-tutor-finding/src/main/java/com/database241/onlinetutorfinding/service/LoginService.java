package com.database241.onlinetutorfinding.service;

import com.database241.onlinetutorfinding.request.LoginRequest;
import com.database241.onlinetutorfinding.response.LoginResponse;

public interface LoginService {
    public LoginResponse login(LoginRequest request);
}