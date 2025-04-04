package com.database241.onlinetutorfinding.response;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TutorSummaryResponseDto
{
    private Long tutorId;
    private String tutorName;
    private String phoneNumber;
    private String sex;
    private String dateOfBirth;
    private String biography;
    private Integer numberOfClass;
    private Long earnedMoney;
}