package com.sametbilek.themooviedb.model;


import lombok.Data;

import java.util.List;

@Data
public class CreditsResponse {
    private Long id;
    private List<Cast> cast;
}
