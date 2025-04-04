package com.database241.onlinetutorfinding.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationReqResponse {
    private Long id;
    private String status;
    private String nameStudent;
    private Long idStudent;
    private List<String> subjects;
    private String address;
    private String teachingStyle;
    private Integer grade;
    private String phoneNumber;
}