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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminInformationResponse {
    private String fullname;
    private String sex;
    private LocalDateTime birthday;
    private String hometown;
    private String cccd;
    private Set<UserContactResponse> contact;
}