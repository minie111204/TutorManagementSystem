package com.database241.onlinetutorfinding.entity.address;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "district_city")
public class DistrictCity {
    @EmbeddedId
    private DistrictCityId id;

    @MapsId("proId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "pro_id", nullable = false)
    private Province province;

    @Column(name = "name")
    private String districtCityName;
}