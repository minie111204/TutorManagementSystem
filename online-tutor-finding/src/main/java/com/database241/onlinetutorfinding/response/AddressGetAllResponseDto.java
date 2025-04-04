package com.database241.onlinetutorfinding.response;

import java.io.Serializable;

/**
 * DTO for {@link com.database241.onlinetutorfinding.entity.address.Address}
 */
public record AddressGetAllResponseDto
        (Long id,
         Integer houseNumber,
         String streetName)
        implements Serializable
{

}