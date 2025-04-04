package com.database241.onlinetutorfinding.response;


import lombok.*;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClassGetClassesResponseDto
{
    private Long classId;
    private String dateStart;
    private String classStatus;
    private String teachingStyle;
    private String classTypeNames;
    private String districtName;
    private String subjectNames;
    private String phoneNumber;
}
