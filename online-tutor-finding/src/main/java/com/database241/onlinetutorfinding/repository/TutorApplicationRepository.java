package com.database241.onlinetutorfinding.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.database241.onlinetutorfinding.entity.clAss.TutorApplication;

public interface TutorApplicationRepository extends JpaRepository<TutorApplication, Long> {
}