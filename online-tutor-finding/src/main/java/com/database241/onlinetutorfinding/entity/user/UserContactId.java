package com.database241.onlinetutorfinding.entity.user;

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
public class UserContactId implements Serializable {
    @Serial
    private static final long serialVersionUID = 1100726876923121515L;
    @Column(name = "contact_email", nullable = false)
    private String contactEmail;

    @Column(name = "contact_phone_number", nullable = false)
    private String contactPhoneNumber;

    @Column(name = "social_media_link", nullable = false)
    private String socialMediaLink;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserContactId entity = (UserContactId) o;
        return Objects.equals(this.contactEmail, entity.contactEmail) &&
                Objects.equals(this.contactPhoneNumber, entity.contactPhoneNumber) &&
                Objects.equals(this.socialMediaLink, entity.socialMediaLink) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(contactEmail, contactPhoneNumber, socialMediaLink, userId);
    }
}