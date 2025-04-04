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
@Table(name = "class_type")
public class ClassType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_type_id", nullable = false)
    private Long id;

    @Column(name = "class_type_name")
    private String classTypeName;

    @ManyToMany(mappedBy = "classTypes")
    private List<TutorApplication> tutorApplications = new ArrayList<>();

    @ManyToMany(mappedBy="classTypes")
    private List<ConsultationReq> consultationReqs = new ArrayList<>();
}