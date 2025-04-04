package com.database241.onlinetutorfinding.entity.clAss;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "week_day")
public class WeekDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "week_id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;
}