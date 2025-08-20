package com.sametbilek.themooviedb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Cast {

    @JsonProperty("id")
    private Long id;
    private String name;
    @JsonProperty("profile_path")
    private String profilePath;
    private String character;

}
