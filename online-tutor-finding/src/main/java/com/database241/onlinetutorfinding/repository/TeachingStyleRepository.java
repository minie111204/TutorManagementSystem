package com.database241.onlinetutorfinding.repository;


import com.database241.onlinetutorfinding.entity.clAss.TeachingStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TeachingStyleRepository extends JpaRepository<TeachingStyle, Long>
{
}
