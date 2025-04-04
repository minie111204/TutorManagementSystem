package com.database241.onlinetutorfinding.entity.address;

import java.util.LinkedHashSet;
import java.util.Set;

import com.database241.onlinetutorfinding.entity.clAss.ConsultationReq;
import com.database241.onlinetutorfinding.entity.clAss.TutorApplication;
import com.database241.onlinetutorfinding.entity.user.SystemUser;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addr_id", nullable = false)
    private Long id;

    @Column(name = "house_number")
    private Integer houseNumber;

    @Column(name = "str_name")
    private String streetName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private SystemUser systemUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "dist_city_id", referencedColumnName = "dist_city_id"),
            @JoinColumn(name = "pro_id", referencedColumnName = "pro_id"),
            @JoinColumn(name = "ward_id", referencedColumnName = "ward_id")
    })
    private Ward ward;

    @OneToMany(mappedBy = "address",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<TutorApplication> tutorApplications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "address",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<ConsultationReq> consultationReqs = new LinkedHashSet<>();
}