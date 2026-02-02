package com.jartiste.backend.presentation.dto.response;

import lombok.Builder;

@Builder
public record SongResponse(Long id, String title, String artist, int duration, String songUrl, String coverUrl) {
}
