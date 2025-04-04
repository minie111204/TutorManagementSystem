package com.database241.onlinetutorfinding.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.database241.onlinetutorfinding.entity.address.Address;
import com.database241.onlinetutorfinding.mapper.AddressMapper;
import com.database241.onlinetutorfinding.repository.AddressRepository;
import com.database241.onlinetutorfinding.response.AddressGetAllResponseDto;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class AddressService
{
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;


    public List<AddressGetAllResponseDto> getAllAddresses(String phoneNumber)
    {
        List<Address> addressList = addressRepository.findAddressesByPhoneNumber(phoneNumber);

        return addressList
                .stream()
                .map(addressMapper::toDto)
                .collect(Collectors.toList());
    }
}
