package com.jartiste.backend.application.service.impl;

import com.jartiste.backend.application.service.IUserService;
import com.jartiste.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService  implements IUserService {

    private final UserRepository userRepository;
}
