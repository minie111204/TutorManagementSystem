package com.database241.onlinetutorfinding.response;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.database241.onlinetutorfinding.entity.clAss.Class}
 */
public record ClassUpdateClassResponseDto
        (
                Long id,
                Long classDeposit,
                String classStatus,
                Long commissionFee,
                String requirements,
                LocalDateTime dateStart,
                Long salary
        )
        implements Serializable
{
}