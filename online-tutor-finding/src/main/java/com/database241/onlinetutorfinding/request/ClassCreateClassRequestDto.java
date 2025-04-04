package com.database241.onlinetutorfinding.request;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

/**
 * DTO for {@link com.database241.onlinetutorfinding.entity.clAss.Class}
 */
@Builder
public record ClassCreateClassRequestDto(
                Long classDeposit,
                String classStatus,
                Long commissionFee,
                String requirements,
                LocalDateTime dateStart,
                Long salary,
                Long addrId,
                String studentPhoneNumber,
                Long tsId,
                String tutorPhoneNumber,
                List<Long> subjectIds,
                List<Long> classTypeIds,
                List<DateAndTimeDto> dateAndTimeDtoList)
                implements Serializable {
}