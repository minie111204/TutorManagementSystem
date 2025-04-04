package com.database241.onlinetutorfinding.response;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Builder
@Data
@Setter
@Getter
public class TutorApplicationFunctionResponseDto
{
    private Integer tutorId;
    private Integer acceptedCount;
    private Integer deniedCount;
    private String errorMessage;
}
