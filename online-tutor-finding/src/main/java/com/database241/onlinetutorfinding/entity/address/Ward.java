package com.database241.onlinetutorfinding.entity.address;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ward")
public class Ward {
    @EmbeddedId
    private WardId id;

    @MapsId("districtCityId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumns({
            @JoinColumn(name = "dist_city_id", referencedColumnName = "dist_city_id", nullable = false),
            @JoinColumn(name = "pro_id", referencedColumnName = "pro_id", nullable = false)
    })
    private DistrictCity districtCity;

    @Column(name = "ward_name")
    private String wardName;
}