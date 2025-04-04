package com.database241.onlinetutorfinding.request;

import java.io.Serializable;

import lombok.Builder;

@Builder
public record DateAndTimeDto
        (
                Long weekId,
                Long slotId
        )
        implements Serializable
{
}
