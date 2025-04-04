package com.database241.onlinetutorfinding.response;

import java.time.LocalDateTime;
import java.util.List;

import com.database241.onlinetutorfinding.request.DateAndTimeDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassUpdateResponse {
    private Long classId;
    private Long studentId;
    private Long tutorId;
    private Long classDeposit;
    private String classStatus;
    private Long commissionFee;
    private String requirements;
    private LocalDateTime dateStart;
    private Long salary;
    private Long addrId;
    private String studentPhoneNumber;
    private Long tsId;
    private String tutorPhoneNumber;
    private List<Long> subjectIds;
    private List<Long> classTypeIds;
    private List<DateAndTimeDto> dateAndTimeDtoList;
}