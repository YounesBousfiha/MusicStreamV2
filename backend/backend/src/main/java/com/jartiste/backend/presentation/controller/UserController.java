package com.jartiste.backend.presentation.controller;


import com.jartiste.backend.application.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final IUserService userService;
}
