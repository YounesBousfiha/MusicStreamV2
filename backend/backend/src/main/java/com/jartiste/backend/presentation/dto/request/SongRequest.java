package com.jartiste.backend.presentation.dto.request;


import lombok.Builder;

@Builder
public record SongRequest(
        String title,
        String artist,
        int duration) {
}
