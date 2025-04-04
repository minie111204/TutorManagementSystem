package com.database241.onlinetutorfinding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Thay đổi thủ tục trong đây để chạy v1-v4
    public void renameTable() {
        String sql = "EXEC sp_rename 'dbo.[user]', 'oft_user'";
        jdbcTemplate.execute(sql);
    }
}
