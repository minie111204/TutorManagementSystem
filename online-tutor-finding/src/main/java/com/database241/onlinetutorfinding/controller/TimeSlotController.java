package com.database241.onlinetutorfinding.controller;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.database241.onlinetutorfinding.repository.TimeSlotRepository;
import com.database241.onlinetutorfinding.response.TimeSlotResponse;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("api/v1/times")
@RequiredArgsConstructor
public class TimeSlotController
{
    private final TimeSlotRepository timeSlotRepository;


    @GetMapping
    ResponseEntity<List<TimeSlotResponse>> getTimeSlots()
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(timeSlotRepository.findAll().stream().map(it -> TimeSlotResponse.builder().endTime(it.getEndTime()).id(it.getId()).startTime(it.getStartTime()).build()).collect(Collectors.toList()));
    }
}
