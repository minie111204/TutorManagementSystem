package com.database241.onlinetutorfinding.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassTypeResponse {
    private Long id;
    private String classTypeName;
}