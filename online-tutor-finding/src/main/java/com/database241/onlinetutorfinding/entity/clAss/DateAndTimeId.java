package com.database241.onlinetutorfinding.entity.clAss;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class DateAndTimeId implements Serializable {
    @Serial
    private static final long serialVersionUID = -2132291863218881962L;
    @Column(name = "class_id", nullable = false)
    private Long classId;

    @Column(name = "slot_id", nullable = false)
    private Long slotId;

    @Column(name = "week_id", nullable = false)
    private Long weekId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        DateAndTimeId entity = (DateAndTimeId) o;
        return Objects.equals(this.weekId, entity.weekId) &&
                Objects.equals(this.classId, entity.classId) &&
                Objects.equals(this.slotId, entity.slotId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(weekId, classId, slotId);
    }

}