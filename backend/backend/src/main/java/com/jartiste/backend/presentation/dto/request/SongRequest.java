package com.jartiste.backend.presentation.dto.request;


import lombok.Builder;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

@Builder
public record SongRequest(
        String title,
        String artist,

        @NotNull(message = "Duration must be provided")
        MultipartFile songFile,
        MultipartFile coverFile
        ) {
}
