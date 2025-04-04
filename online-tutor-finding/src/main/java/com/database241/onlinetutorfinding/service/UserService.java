package com.database241.onlinetutorfinding.service;

import org.springframework.data.domain.Page;

import com.database241.onlinetutorfinding.response.ConsultationReqResponse;
import com.database241.onlinetutorfinding.response.TutorApplicationResponse;

public interface UserService {
    public Object getInformation(Long id) throws Exception ;

    public Page<TutorApplicationResponse> getTutorApplications(Integer pageNo, Integer pageSize);

    public Page<ConsultationReqResponse> getConsultations(Integer pageNo, Integer pageSize);

    public void updateStatusTa(Long id, String status);
}