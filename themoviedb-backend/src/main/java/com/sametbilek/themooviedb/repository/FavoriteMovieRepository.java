package com.sametbilek.themooviedb.repository;

import com.sametbilek.themooviedb.model.FavoriteMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteMovieRepository extends JpaRepository<FavoriteMovie, Long> {
    boolean existsByMovieId(Long movieId);
    void deleteByMovieId(Long movieId);
}