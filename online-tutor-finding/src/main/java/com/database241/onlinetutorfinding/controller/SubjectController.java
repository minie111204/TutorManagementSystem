package com.database241.onlinetutorfinding.controller;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.database241.onlinetutorfinding.repository.SubjectRepository;
import com.database241.onlinetutorfinding.response.SubjectResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/subjects")
@RequiredArgsConstructor
public class SubjectController
{
    private final SubjectRepository subjectRepository;

    @GetMapping
    /*
    Skip service layer because of simplicity
     */
    ResponseEntity<List<SubjectResponse>> getAllSubjects()
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(subjectRepository.findAll().stream().map(it -> SubjectResponse.builder().id(it.getId()).subjectName(it.getSubjectName()).build()).collect(Collectors.toList()));
    }
}
