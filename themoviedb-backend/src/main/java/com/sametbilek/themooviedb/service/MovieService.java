package com.sametbilek.themooviedb.service;


import com.sametbilek.themooviedb.model.Movie;
import com.sametbilek.themooviedb.model.MovieListResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.themoviedb.org/3";
    private final RestTemplate restTemplate = new RestTemplate();

    public MovieListResponse getPopularMovies() {
        String url = String.format("%s/movie/popular?api_key=%s", BASE_URL, apiKey);
        return restTemplate.getForObject(url, MovieListResponse.class);
    }

    public Movie getMovieDetails(Long movieId) {
        String url = String.format("%s/movie/%d?api_key=%s", BASE_URL, movieId, apiKey);
        return restTemplate.getForObject(url, Movie.class);
    }
}