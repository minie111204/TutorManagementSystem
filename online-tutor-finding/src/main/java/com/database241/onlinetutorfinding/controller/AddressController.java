package com.database241.onlinetutorfinding.controller;


import com.database241.onlinetutorfinding.mapper.AddressMapper;
import com.database241.onlinetutorfinding.repository.AddressRepository;
import com.database241.onlinetutorfinding.response.AddressGetAllResponseDto;
import com.database241.onlinetutorfinding.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api/v1/addresses")
@RequiredArgsConstructor
public class AddressController
{
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;


    @GetMapping("{phoneNumber}")
    public ResponseEntity<List<AddressGetAllResponseDto>> getAllAddresses(@PathVariable String phoneNumber)
    {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(addressRepository
                        .findAddressesByPhoneNumber(phoneNumber)
                        .stream()
                        .map(addressMapper::toDto)
                        .collect(Collectors.toList()));
    }
}