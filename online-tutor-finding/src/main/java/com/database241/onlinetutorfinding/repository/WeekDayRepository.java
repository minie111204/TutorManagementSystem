package com.database241.onlinetutorfinding.repository;


import com.database241.onlinetutorfinding.entity.clAss.WeekDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WeekDayRepository extends JpaRepository<WeekDay, Long>
{
}
