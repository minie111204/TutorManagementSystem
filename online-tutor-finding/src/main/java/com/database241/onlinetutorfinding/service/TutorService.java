package com.database241.onlinetutorfinding.service;


import com.database241.onlinetutorfinding.repository.TutorDao;
import com.database241.onlinetutorfinding.response.TutorApplicationFunctionResponseDto;
import com.database241.onlinetutorfinding.response.TutorSummaryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TutorService
{
    private final TutorDao tutorDao;


    public List<TutorSummaryResponseDto> getTutorSummary
            (
                    Integer minClassNum,
                    Long minClassMoney,
                    Integer pageNumber,
                    Integer pageSize
            )
    {
        return tutorDao.getTutorSummary(minClassNum, minClassMoney, pageNumber, pageSize);
    }


    public TutorApplicationFunctionResponseDto getTutorApplicationSummary(int tutorId)
    {
        return tutorDao.getTutorApplicationSummary(tutorId);
    }
}