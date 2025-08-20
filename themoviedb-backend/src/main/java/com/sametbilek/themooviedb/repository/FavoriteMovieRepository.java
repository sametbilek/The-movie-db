package com.sametbilek.themooviedb.repository;

import com.sametbilek.themooviedb.model.FavoriteMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteMovieRepository extends JpaRepository<FavoriteMovie, Long> {
    // Metot isimlerini düzelttik
    boolean existsByMovieIdAndUserId(Long movieId, Long userId);
    void deleteByMovieIdAndUserId(Long movieId, Long userId);
    List<FavoriteMovie> findByUserId(Long userId);
}