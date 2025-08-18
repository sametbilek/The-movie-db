package com.sametbilek.themooviedb.model;

import lombok.Data;
import java.util.List;

@Data
public class MovieListResponse {
    private int page;
    private List<Movie> results;
}