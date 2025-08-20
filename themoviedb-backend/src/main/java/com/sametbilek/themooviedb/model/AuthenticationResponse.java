package com.sametbilek.themooviedb.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwt;
    private final String username; // <-- Kullanıcı adını ekle

}