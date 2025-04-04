package com.database241.onlinetutorfinding.service;


import com.database241.onlinetutorfinding.repository.RevenueDao;
import com.database241.onlinetutorfinding.response.RevenueResultFunctionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RevenueService
{
    private final RevenueDao revenueDAO;


    public RevenueResultFunctionResponse getRevenue(String types, String inputValues)
    {
        return revenueDAO.calculateRevenue(types, inputValues);
    }
}
