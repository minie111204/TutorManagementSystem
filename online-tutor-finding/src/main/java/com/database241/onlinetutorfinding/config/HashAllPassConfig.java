package com.database241.onlinetutorfinding.config;

import com.database241.onlinetutorfinding.entity.user.SystemUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.database241.onlinetutorfinding.repository.SystemUserRepository;
import com.database241.onlinetutorfinding.util.Util;


@Configuration
public class HashAllPassConfig implements Runnable {

    @Autowired
    private Util util;

    @Autowired
    private SystemUserRepository systemUserRepository;

    @Override
    public void run() {
//         List<SystemUser> systemUsers = systemUserRepository.findAll();
//         for(SystemUser user : systemUsers){
//             user.setPassword(util.sha1Hash(user.getPassword()));
//         }
//         systemUserRepository.saveAll(systemUsers);
    }
    
}