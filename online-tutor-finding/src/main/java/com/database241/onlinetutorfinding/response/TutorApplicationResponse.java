package com.database241.onlinetutorfinding.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TutorApplicationResponse
{
    private Long id;
    private String status;
    private String nameStudent;
    private List<String> subjects;
    private Integer grade;
    private String address;
    private Long idAddr;
    private Long idStudent;
    private Long idTutor;
    private String styleTeaching;
    private String nameTutor;
    private String phoneNumber;
    private String requirement;
}