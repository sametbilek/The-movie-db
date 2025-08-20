package com.sametbilek.themooviedb.service;


import com.sametbilek.themooviedb.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.sametbilek.themooviedb.repository.FavoriteMovieRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.themoviedb.org/3";
    private final RestTemplate restTemplate = new RestTemplate();
    @Autowired
    private FavoriteMovieRepository favoriteMovieRepository;

    public MovieListResponse getPopularMovies(int page) {
        String url = String.format("%s/movie/popular?api_key=%s&page=%d", BASE_URL, apiKey, page);
        return restTemplate.getForObject(url, MovieListResponse.class);
    }

    public Movie getMovieDetails(Long movieId) {
        String url = String.format("%s/movie/%d?api_key=%s", BASE_URL, movieId, apiKey);
        return restTemplate.getForObject(url, Movie.class);
    }
    public CreditsResponse getMovieCast(Long movieId) {
        String url = String.format("%s/movie/%d/credits?api_key=%s", BASE_URL, movieId, apiKey);
        return restTemplate.getForObject(url, CreditsResponse.class);
    }
    public Person getPersonDetails(Long personId) {
        String url = String.format("%s/person/%d?api_key=%s", BASE_URL, personId, apiKey);
        return restTemplate.getForObject(url, Person.class);
    }
    public void addFavorite(Long movieId) {
        if (!favoriteMovieRepository.existsByMovieId(movieId)) {
            FavoriteMovie favorite = new FavoriteMovie();
            favorite.setMovieId(movieId);
            favoriteMovieRepository.save(favorite);
        }
    }

    @Transactional
    public void removeFavorite(Long movieId) {
        favoriteMovieRepository.deleteByMovieId(movieId);
    }

    public boolean isFavorite(Long movieId) {
        return favoriteMovieRepository.existsByMovieId(movieId);
    }

    public List<Long> getFavoriteMovieIds() {
        return favoriteMovieRepository.findAll().stream()
                .map(FavoriteMovie::getMovieId)
                .collect(Collectors.toList());
    }
}