package com.database241.onlinetutorfinding.controller;


import com.database241.onlinetutorfinding.response.RevenueResultFunctionResponse;
import com.database241.onlinetutorfinding.service.RevenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/revenue")
@RequiredArgsConstructor
public class RevenueController
{
    private final RevenueService revenueService;


    @GetMapping
    ResponseEntity<RevenueResultFunctionResponse> getRevenue
            (
                    @RequestParam(name = "type", defaultValue = "ALL") String type,
                    @RequestParam(name = "input", defaultValue = "") String input
            )
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(revenueService.getRevenue(type, input));
    }

}
