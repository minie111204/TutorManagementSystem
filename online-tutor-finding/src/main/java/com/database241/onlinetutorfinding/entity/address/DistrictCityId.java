package com.database241.onlinetutorfinding.entity.address;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class DistrictCityId implements Serializable {
    private static final long serialVersionUID = -333937424744470600L;
    @Column(name = "dist_city_id", nullable = false)
    private Long distCityId;

    @Column(name = "pro_id", nullable = false)
    private Long proId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        DistrictCityId entity = (DistrictCityId) o;
        return Objects.equals(this.distCityId, entity.distCityId) &&
                Objects.equals(this.proId, entity.proId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(distCityId, proId);
    }

}