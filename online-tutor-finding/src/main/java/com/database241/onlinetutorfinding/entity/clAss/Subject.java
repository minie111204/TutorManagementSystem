package com.database241.onlinetutorfinding.entity.clAss;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id", nullable = false)
    private Long id;

    @Column(name = "subject_name")
    private String subjectName;

    @ManyToMany(mappedBy="subjects")
    private List<TutorApplication> tutorApplications = new ArrayList<>();

    @ManyToMany(mappedBy="subjects")
    private List<ConsultationReq> consultationReqs = new ArrayList<>();
}