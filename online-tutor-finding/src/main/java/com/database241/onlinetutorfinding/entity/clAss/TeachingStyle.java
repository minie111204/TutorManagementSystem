package com.database241.onlinetutorfinding.entity.clAss;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "teaching_style")
public class TeachingStyle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ts_id", nullable = false)
    private Long id;

    @Column(name = "ts_name")
    private String tsName;

    @OneToMany(mappedBy = "teachingStyle",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<TutorApplication> tutorApplications = new LinkedHashSet<>();

    @ManyToMany(mappedBy="teachingStyles")
    private List<ConsultationReq> consultationReqs = new ArrayList<>();
}