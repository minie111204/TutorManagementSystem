package com.database241.onlinetutorfinding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.database241.onlinetutorfinding.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/information")
    public ResponseEntity<?> getInformation(@RequestParam Long id) throws Exception {
        try{
            return ResponseEntity.ok(userService.getInformation(id));
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/teaching-applications")
    public ResponseEntity<?> getListTa(@RequestParam(required = false, defaultValue="0") Integer pageNo, @RequestParam(required=false, defaultValue="15") Integer pageSize) throws Exception {
        try{
            return ResponseEntity.ok(userService.getTutorApplications(pageNo, pageSize));
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/consultation-reqs")
    public ResponseEntity<?> getListCq(@RequestParam(required = false, defaultValue="0") Integer pageNo, @RequestParam(required=false, defaultValue="15") Integer pageSize) throws Exception {
        try{
            return ResponseEntity.ok(userService.getConsultations(pageNo, pageSize));
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/status-ta")
    public ResponseEntity<?> updateStatusTa(@RequestParam Long id, @RequestParam String status){
        userService.updateStatusTa(id, status);
        return ResponseEntity.ok().build();
    }
}