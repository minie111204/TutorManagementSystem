package com.database241.onlinetutorfinding.controller;

import com.database241.onlinetutorfinding.entity.clAss.ClassType;
import com.database241.onlinetutorfinding.repository.ClassTypeRepository;
import com.database241.onlinetutorfinding.response.ClassTypeResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api/v1/types")
@RequiredArgsConstructor
public class ClassTypeController
{
    private final ClassTypeRepository classTypeRepository;


    @GetMapping
    /*
    Skip service layer because of simplicity
    */
    ResponseEntity<List<ClassTypeResponse>> getAllClassTypes()
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(classTypeRepository.findAll().stream().map(it -> ClassTypeResponse.builder().id(it.getId()).classTypeName(it.getClassTypeName()).build()).collect(Collectors.toList()));
    }
}
