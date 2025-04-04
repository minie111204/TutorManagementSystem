package com.database241.onlinetutorfinding.entity.clAss;

import java.util.ArrayList;
import java.util.List;

import com.database241.onlinetutorfinding.entity.address.Address;
import com.database241.onlinetutorfinding.entity.user.Student;
import com.database241.onlinetutorfinding.entity.user.Tutor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name="tutor_application")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class TutorApplication
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ta_id")
    private Long id;

    private String requirement;

    @Column(name="ta_status")
    private String taStatus;

    @ManyToOne
    @JoinColumn(name="student_id", nullable=false)
    private Student student;

    @ManyToOne
    @JoinColumn(name="tutor_id")
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name="addr_id", nullable=false)
    private Address address;

    @ManyToOne
    @JoinColumn(name="ts_id", nullable=false)
    private TeachingStyle teachingStyle;

    @ManyToMany
    @JoinTable(
            name="s_wants_type",
            inverseJoinColumns = @JoinColumn(name="class_type_id", nullable=false),
            joinColumns = @JoinColumn(name="ta_id")
    )
    private List<ClassType> classTypes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name="s_wants_subject",
            inverseJoinColumns = @JoinColumn(name="subject_id", nullable=false),
            joinColumns = @JoinColumn(name="ta_id")
    )
    private List<Subject> subjects = new ArrayList<>();
}