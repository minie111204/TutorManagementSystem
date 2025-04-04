package com.database241.onlinetutorfinding.repository;


import com.database241.onlinetutorfinding.entity.clAss.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ClassRepositoryJPA extends JpaRepository<Class, Long>
{

}
