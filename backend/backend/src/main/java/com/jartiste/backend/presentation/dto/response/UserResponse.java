package com.jartiste.backend.presentation.dto.response;


public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email
) {
}
