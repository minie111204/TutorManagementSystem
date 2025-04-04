package com.database241.onlinetutorfinding.controller;

import com.database241.onlinetutorfinding.service.DatabaseService;  // Import dịch vụ bạn sử dụng
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DatabaseController {

    private final DatabaseService databaseService;

    @GetMapping("/rename-table")
    public String renameTable() {
        try {
            databaseService.renameTable();
            return "Table renamed successfully.";
        } catch (Exception e) {
            return "Error occurred: " + e.getMessage();
        }
    }
}
