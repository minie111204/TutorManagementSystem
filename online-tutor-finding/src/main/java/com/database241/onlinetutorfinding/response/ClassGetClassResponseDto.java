package com.database241.onlinetutorfinding.response;

import com.database241.onlinetutorfinding.request.DateAndTimeDto;
import lombok.Builder;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link com.database241.onlinetutorfinding.entity.clAss.Class}
 */
@Value
@Builder
public class ClassGetClassResponseDto implements Serializable
{
    Long id;
    String classStatus;
    Long salary;
    Long commissionFee;
    String studentName;
    Set<String> subjects;
    Set<DateAndTime> dateAndTimeList;
    String address;
    String requirements;
    String dateStart;
    Long classDeposit;
    String teachingStyleTName;
    String tutorFullName;
    Set<String> classTypes;


    @Value
    @Builder
    public static class DateAndTime
    {
        String weekDay;
        String time;
    }
}