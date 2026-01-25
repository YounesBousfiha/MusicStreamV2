package com.jartiste.backend.infrastructure.seeder;


import com.jartiste.backend.domain.entity.User;
import com.jartiste.backend.domain.enums.Role;
import com.jartiste.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> seedAdminUser();
    }


    private void seedAdminUser() {
        if(this.userRepository.count() == 0) {
            User user = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("Evil1234"))
                    .role(Role.ADMIN)
                    .build();


            this.userRepository.save(user);

            log.info("Admin user created successfully! ");
        }
    }

}
