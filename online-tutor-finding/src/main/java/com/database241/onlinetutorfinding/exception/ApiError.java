package com.database241.onlinetutorfinding.exception;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiError
{
    private int status;
    private String error;
    private String message;
    private LocalDateTime timestamp;
}
