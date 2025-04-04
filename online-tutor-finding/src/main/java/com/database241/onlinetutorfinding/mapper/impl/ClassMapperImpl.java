package com.database241.onlinetutorfinding.mapper.impl;


import com.database241.onlinetutorfinding.entity.clAss.Class;
import com.database241.onlinetutorfinding.entity.clAss.ClassType;
import com.database241.onlinetutorfinding.entity.clAss.Subject;
import com.database241.onlinetutorfinding.mapper.ClassMapper;
import com.database241.onlinetutorfinding.response.ClassGetClassResponseDto;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ClassMapperImpl implements ClassMapper
{
    @Override
    public ClassGetClassResponseDto toDto1(Class class1)
    {
        return ClassGetClassResponseDto
                .builder()
                .id(class1.getId())
                .classStatus(class1.getClassStatus())
                .salary(class1.getSalary())
                .commissionFee
                        (
                                (class1.getCommissionFee() == null)?(0L):(class1.getCommissionFee())
                        )
                .studentName(class1.getStudent().getFullName())
                .subjects
                        (
                                class1
                                        .getSubjects()
                                        .stream()
                                        .map(Subject::getSubjectName)
                                        .collect(Collectors.toSet())
                        )
                .dateAndTimeList
                        (
                                class1
                                        .getDatesAndTimes()
                                        .stream()
                                        .map
                                                (
                                                dateAndTime ->
                                                        ClassGetClassResponseDto
                                                                .DateAndTime
                                                                .builder()
                                                                .weekDay(dateAndTime.getWeek().getName())
                                                                .time
                                                                (
                                                                        String
                                                                                .format("%s:00 - %s:00",
                                                                                        dateAndTime.getSlot().getStartTime().getHour(),
                                                                                        dateAndTime.getSlot().getEndTime().getHour())
                                                                )
                                                                .build()
                                                )
                                        .collect(Collectors.toSet())
                        )
                .address
                        (
                                String.format
                                        (
                                                "%s, %s, %s, %s, %s",
                                                class1.getAddress().getHouseNumber(),
                                                class1.getAddress().getStreetName(),
                                                class1.getAddress().getWard().getWardName(),
                                                class1.getAddress().getWard().getDistrictCity().getDistrictCityName(),
                                                class1.getAddress().getWard().getDistrictCity().getProvince().getProvinceName()

                                        )
                        )
                .requirements
                        (
                                (class1.getRequirements() == null)?("Chua co thong tin"):(class1.getRequirements())
                        )
                .dateStart
                        (
                                (class1.getDateStart() != null)?(class1.getDateStart().toLocalDate().toString()):("Chua co thong tin")
                        )
                .classDeposit(class1.getClassDeposit())
                .teachingStyleTName(class1.getTeachingStyle().getTsName())
                .tutorFullName((class1.getTutor() == null)?("Chua co thong tin"):(class1.getTutor().getFullName()))
                .classTypes
                        (
                                class1
                                        .getClassTypes()
                                        .stream()
                                        .map(ClassType::getClassTypeName)
                                        .collect(Collectors.toSet())
                        )
                .build();
    }
}
