package com.database241.onlinetutorfinding.entity.clAss;

import java.util.ArrayList;
import java.util.List;

import com.database241.onlinetutorfinding.entity.address.Address;
import com.database241.onlinetutorfinding.entity.user.Student;

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
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="consultation_req")
public class ConsultationReq {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="cq_id")
    private Long id;

    private String requirement;

    @Column(name="cq_status")
    private String cqStatus;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    private Student student;

    @ManyToMany
    @JoinTable(
            name="wants_type",
            inverseJoinColumns = @JoinColumn(name="class_type_id", nullable=false),
            joinColumns = @JoinColumn(name="cq_id")
    )
    private List<ClassType> classTypes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name="wants_subject",
            inverseJoinColumns = @JoinColumn(name="subject_id", nullable=false),
            joinColumns= @JoinColumn(name="cq_id")
    )
    private List<Subject> subjects = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name="wants_style",
            inverseJoinColumns = @JoinColumn(name="ts_id", nullable=false),
            joinColumns= @JoinColumn(name="cq_id")
    )
    private List<TeachingStyle> teachingStyles = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="addr_id", nullable=false)
    private Address address;
}