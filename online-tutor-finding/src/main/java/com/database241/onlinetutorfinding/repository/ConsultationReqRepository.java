package com.database241.onlinetutorfinding.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.database241.onlinetutorfinding.entity.clAss.ConsultationReq;

public interface ConsultationReqRepository extends JpaRepository<ConsultationReq, Long> {
}