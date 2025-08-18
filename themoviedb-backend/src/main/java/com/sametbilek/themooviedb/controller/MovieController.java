package com.sametbilek.themooviedb.controller;

import com.sametbilek.themooviedb.model.Movie;
import com.sametbilek.themooviedb.model.MovieListResponse;
import com.sametbilek.themooviedb.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/popular")
    public MovieListResponse getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovieDetails(@PathVariable Long id) {
        return movieService.getMovieDetails(id);
    }
}