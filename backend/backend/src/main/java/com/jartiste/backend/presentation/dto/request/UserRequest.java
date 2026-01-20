package com.jartiste.backend.presentation.dto.request;

import lombok.Builder;

@Builder
public record UserRequest(
        String firstName,
        String lastName,
        String email,
        String password
) {
}
