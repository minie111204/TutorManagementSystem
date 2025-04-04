package com.database241.onlinetutorfinding.response;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentInformationResponse {
    private String fullname;
    private String sex;
    private Integer grade;
    private String school;
    private Set<String> address;
    private Set<UserContactResponse> contact;
}