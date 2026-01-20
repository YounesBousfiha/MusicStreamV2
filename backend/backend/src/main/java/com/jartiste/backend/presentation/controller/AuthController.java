package com.jartiste.backend.presentation.controller;


import com.jartiste.backend.application.service.impl.AuthService;
import com.jartiste.backend.presentation.dto.request.LoginRequest;
import com.jartiste.backend.presentation.dto.request.RegisterRequest;
import com.jartiste.backend.presentation.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(LoginRequest request) {
        return ResponseEntity.ok(this.authService.login(request));
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(RegisterRequest request) {
        return ResponseEntity.ok(this.authService.register(request));
    }
}
