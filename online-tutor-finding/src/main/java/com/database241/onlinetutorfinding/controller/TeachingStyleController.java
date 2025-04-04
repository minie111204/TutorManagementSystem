package com.database241.onlinetutorfinding.controller;


import com.database241.onlinetutorfinding.entity.clAss.TeachingStyle;
import com.database241.onlinetutorfinding.repository.TeachingStyleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import com.database241.onlinetutorfinding.response.TeachingStyleResponse;


@RestController
@RequestMapping("api/v1/styles")
@RequiredArgsConstructor
public class TeachingStyleController
{
    private final TeachingStyleRepository teachingStyleRepository;

    @GetMapping
    /*
    Skip service layer because of simplicity
     */
    ResponseEntity<List<TeachingStyleResponse>> getAllTeachingStyles()
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(teachingStyleRepository.findAll().stream().map(it -> TeachingStyleResponse.builder().id(it.getId()).tsName(it.getTsName()).build()).collect(Collectors.toList()));
    }
}
