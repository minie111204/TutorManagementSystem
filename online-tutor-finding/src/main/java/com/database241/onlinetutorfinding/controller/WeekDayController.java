package com.database241.onlinetutorfinding.controller;


import com.database241.onlinetutorfinding.entity.clAss.WeekDay;
import com.database241.onlinetutorfinding.repository.WeekDayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/days")
public class WeekDayController
{
    private final WeekDayRepository weekDayRepository;


    @GetMapping
    ResponseEntity<List<WeekDay>> getWeekDays()
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(weekDayRepository.findAll());
    }
}
