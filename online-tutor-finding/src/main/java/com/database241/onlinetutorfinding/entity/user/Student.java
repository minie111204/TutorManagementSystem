package com.database241.onlinetutorfinding.entity.user;

import java.util.LinkedHashSet;
import java.util.Set;

import com.database241.onlinetutorfinding.entity.clAss.ConsultationReq;
import com.database241.onlinetutorfinding.entity.clAss.TutorApplication;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "student")
@PrimaryKeyJoinColumn(name = "student_id")
public class Student extends SystemUser
{
    @Column(name = "stu_grade")
    private Integer stuGrade;

    @Column(name = "stu_school")
    private String stuSchool;

    @OneToMany(mappedBy = "student",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<TutorApplication> tutorApplications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "student",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<ConsultationReq> consultationReqs = new LinkedHashSet<>();
}