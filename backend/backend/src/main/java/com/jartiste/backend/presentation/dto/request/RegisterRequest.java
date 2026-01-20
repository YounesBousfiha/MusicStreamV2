package com.jartiste.backend.presentation.dto.request;

public record RegisterRequest(
        String firstName,
        String lastName,
        String email,
        String password
) {
}
