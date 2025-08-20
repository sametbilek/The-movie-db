package com.sametbilek.themooviedb.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Person {

    @JsonProperty("id")
    private Long id;
    private String name;
    private String biography;
    @JsonProperty("profile_path")
    private String profilePath;
    @JsonProperty("birthday")
    private String birthday;
    @JsonProperty("place_of_birth")
    private String placeOfBirth;
}
