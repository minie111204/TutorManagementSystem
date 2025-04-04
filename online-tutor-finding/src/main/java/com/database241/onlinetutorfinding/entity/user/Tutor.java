package com.database241.onlinetutorfinding.entity.user;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import com.database241.onlinetutorfinding.entity.clAss.TutorApplication;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tutor")
@PrimaryKeyJoinColumn(name = "tutor_id")
public class Tutor extends Staff
{
    @Column(name = "bio")
    private String bio;

    @Column(name = "date_joined")
    private LocalDateTime dateJoined;

    @Column(name = "inviting_code", unique = true) // Ensure this column is unique if needed
    private String invitingCode;

    @Column(name = "n_of_invitations")
    private Integer nOfInvitations;

    @Column(name = "rate")
    private Integer rate;

    /*
        Referenced to the Tutor, that he/she
        has invited me
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invited_code", referencedColumnName = "inviting_code")
    private Tutor invitedCode;  // References another tutor's "inviting_code" field

    @OneToMany(mappedBy = "tutor",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private Set<TutorApplication> tutorApplications = new LinkedHashSet<>();
}