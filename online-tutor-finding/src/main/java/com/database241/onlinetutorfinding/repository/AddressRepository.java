package com.database241.onlinetutorfinding.repository;


import com.database241.onlinetutorfinding.entity.address.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AddressRepository extends JpaRepository<Address, Long>
{
    @Query("select a from Address a " +
            "join fetch a.ward w " +
            "join fetch w.districtCity d " +
            "join fetch d.province p " +
            "join a.systemUser u " +
            "where u.phoneNumber = :phoneNumber")
    List<Address> findAddressesByPhoneNumber(@Param("phoneNumber") String phoneNumber);
}
