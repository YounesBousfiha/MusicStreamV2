package com.jartiste.backend.application.service.impl;

import com.jartiste.backend.application.service.IAuthService;
import com.jartiste.backend.domain.entity.User;
import com.jartiste.backend.domain.enums.Role;
import com.jartiste.backend.domain.exception.UserAlreadyExistsException;
import com.jartiste.backend.domain.repository.UserRepository;
import com.jartiste.backend.infrastructure.security.JwtService;
import com.jartiste.backend.presentation.dto.request.LoginRequest;
import com.jartiste.backend.presentation.dto.request.RegisterRequest;
import com.jartiste.backend.presentation.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService  implements IAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    @Override
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(), request.password()
                )
        );

        var user = this.userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + request.email()));

        var jwtToken = jwtService.generateJwtToken(user.getEmail());

        return LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }

    @Override
    public String register(RegisterRequest request) {

        if(this.userRepository.findByEmail(request.email()).isPresent()) {
            throw new UserAlreadyExistsException("Email Already exists");
        }

        var user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .role(Role.USER)
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .build();

        this.userRepository.save(user);

        return "Thanks for your Registration";
    }
}
