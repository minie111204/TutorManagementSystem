package com.database241.onlinetutorfinding.mapper;

import com.database241.onlinetutorfinding.entity.address.Address;
import com.database241.onlinetutorfinding.response.AddressGetAllResponseDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface AddressMapper {
    Address toEntity(AddressGetAllResponseDto addressGetAllResponseDto);

    AddressGetAllResponseDto toDto(Address address);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)Address partialUpdate(AddressGetAllResponseDto addressGetAllResponseDto, @MappingTarget Address address);
}