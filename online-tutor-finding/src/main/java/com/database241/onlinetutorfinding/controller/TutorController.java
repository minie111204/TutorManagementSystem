package com.database241.onlinetutorfinding.controller;


import com.database241.onlinetutorfinding.response.TutorApplicationFunctionResponseDto;
import com.database241.onlinetutorfinding.response.TutorSummaryResponseDto;
import com.database241.onlinetutorfinding.service.TutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/tutors/summary")
@RequiredArgsConstructor
public class TutorController
{
    private final TutorService tutorService;


    @GetMapping
    ResponseEntity<List<TutorSummaryResponseDto>> getTutorSummary
            (
                    @RequestParam(required = false) Integer minClassNum,
                    @RequestParam(required = false) Long minClassMoney,
                    @RequestParam(defaultValue = "1") Integer pageNumber,
                    @RequestParam(defaultValue = "10") Integer pageSize
            )
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tutorService.getTutorSummary(minClassNum, minClassMoney, pageNumber, pageSize));
    }


    @GetMapping(value = "/{tutorId}")
    ResponseEntity<TutorApplicationFunctionResponseDto> getTutorApplicationSummary(@PathVariable Integer tutorId)
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tutorService.getTutorApplicationSummary(tutorId));
    }
}
