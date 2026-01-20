package com.jartiste.backend.presentation.dto.response;

import com.jartiste.backend.domain.enums.Role;
import lombok.Builder;

@Builder
public record LoginResponse(
        Long id,
        String token,
        String email,
        Role role
) {
}
