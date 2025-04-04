package com.database241.onlinetutorfinding.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "staff")
@PrimaryKeyJoinColumn(name = "staff_id", referencedColumnName = "user_id")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Staff extends SystemUser
{
    @Column(name = "date_of_birth")
    private LocalDateTime dateOfBirth;

    @Column(name = "national_id")
    private String nationalId;

    @Column(name = "place_of_origin")
    private String placeOfOrigin;

    @Column(name = "profile_photo_url")
    private byte[] profilePhotoUrl;
}