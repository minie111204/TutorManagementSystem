package com.database241.onlinetutorfinding.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "administrator")
@PrimaryKeyJoinColumn(name = "admin_id")
public class Administrator extends Staff
{
    
}