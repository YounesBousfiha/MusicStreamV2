package com.jartiste.backend.application.service;

import com.jartiste.backend.presentation.dto.request.LoginRequest;
import com.jartiste.backend.presentation.dto.request.RegisterRequest;
import com.jartiste.backend.presentation.dto.response.LoginResponse;

public interface IAuthService {

    LoginResponse login(LoginRequest request);

    String register(RegisterRequest request);
}
