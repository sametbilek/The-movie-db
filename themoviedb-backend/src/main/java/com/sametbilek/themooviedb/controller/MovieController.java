package com.sametbilek.themooviedb.controller;

import com.sametbilek.themooviedb.model.CreditsResponse;
import com.sametbilek.themooviedb.model.Movie;
import com.sametbilek.themooviedb.model.MovieListResponse;
import com.sametbilek.themooviedb.model.Person;
import com.sametbilek.themooviedb.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin("http://localhost:4200")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/popular")
    public MovieListResponse getPopularMovies(@RequestParam(defaultValue = "1") int page) {
        return movieService.getPopularMovies(page);
    }

    @GetMapping("/{id}")
    public Movie getMovieDetails(@PathVariable Long id) {
        return movieService.getMovieDetails(id);
    }
    @GetMapping("/{id}/cast")
    public CreditsResponse getMovieCast(@PathVariable Long id){
        return movieService.getMovieCast(id);
    }
    @GetMapping("/person/{id}")
    public Person getPersonDetails(@PathVariable Long id) {
        return movieService.getPersonDetails(id);
    }
    @PostMapping("/favorite/add")
    public ResponseEntity<Void> addFavorite(@RequestParam Long movieId) {
        movieService.addFavorite(movieId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/favorite/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long movieId) {
        movieService.removeFavorite(movieId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favorite/ids")
    public List<Long> getFavoriteMovieIds() {
        return movieService.getFavoriteMovieIds();
    }

    @GetMapping("/favorite/{movieId}")
    public boolean isFavorite(@PathVariable Long movieId) {
        return movieService.isFavorite(movieId);
    }

}