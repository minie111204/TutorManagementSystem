package com.database241.onlinetutorfinding.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public class ClassRepository
{
    @PersistenceContext
    private EntityManager entityManager;


    public Long insertTableClass
            (
                    Long classDeposit,
                    String classStatus,
                    Long commissionFee,
                    String requirements,
                    LocalDateTime dateStart,
                    Long salary,
                    Long addrId,
                    Long studentId,
                    Long tsId,
                    Long tutorId
            )
    {
        StoredProcedureQuery storedProcedure =
                entityManager.createNamedStoredProcedureQuery("Class.insertClass");

        storedProcedure.setParameter("class_deposit", classDeposit);
        storedProcedure.setParameter("class_status", classStatus);
        storedProcedure.setParameter("commission_fee", commissionFee);
        storedProcedure.setParameter("requirements", requirements);
        storedProcedure.setParameter("date_start", dateStart);
        storedProcedure.setParameter("salary", salary);
        storedProcedure.setParameter("addr_id", addrId);
        storedProcedure.setParameter("student_id", studentId);
        storedProcedure.setParameter("ts_id", tsId);
        storedProcedure.setParameter("tutor_id", tutorId);

        storedProcedure.execute();

        return (Long)storedProcedure.getOutputParameterValue("inserted_class_id");
    }
}
