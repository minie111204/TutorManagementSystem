package com.database241.onlinetutorfinding.entity.clAss;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "time_slot")
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slot_id", nullable = false)
    private Long id;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "start_time")
    private LocalDateTime startTime;
}