package com.database241.onlinetutorfinding.response;


import lombok.*;

@Builder
@Data
@Getter
@Setter
@AllArgsConstructor
public class RevenueResultFunctionResponse
{
    private Double currentRevenue;
    private Double expectedRevenue;
    private Double discountRevenue;
    private String errorMessage;
}
