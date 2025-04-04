package com.database241.onlinetutorfinding.response;

import java.time.LocalDateTime;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TutorInformationResponse {
    private String fullname;
    private String sex;
    private LocalDateTime birthday;
    private String hometown;
    private String cccd;
    private Set<String> address;
    private LocalDateTime dateJoin;
    private String codeInviting;
    private Integer nOfInvitations;
    private String codeInvited;
    private String bio;
    private Integer rate;
    private Set<UserContactResponse> contact;
}