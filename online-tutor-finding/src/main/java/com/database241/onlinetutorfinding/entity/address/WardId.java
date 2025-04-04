package com.database241.onlinetutorfinding.entity.address;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class WardId implements Serializable {
    private static final long serialVersionUID = -9110743957178153842L;

    @Embedded
    private DistrictCityId districtCityId;

    @Column(name = "ward_id", nullable = false)
    private Long wardId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        WardId entity = (WardId) o;
        return Objects.equals(this.districtCityId, entity.districtCityId) &&
                Objects.equals(this.wardId, entity.wardId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(districtCityId, wardId);
    }
}