package com.jartiste.backend.infrastructure.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Arrays;
import java.util.List;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
@Slf4j
public class AppStartupSanityCheck  implements ApplicationContextInitializer<ConfigurableApplicationContext> {


    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment env = applicationContext.getEnvironment();
        boolean isDevProfileActive = Arrays.asList(env.getActiveProfiles()).contains("dev");

        log.info("Verifying Vault Secrets & DB Config...");

        List<String> requiredKeys = Arrays.asList(
                "spring.datasource.url",
                "spring.datasource.username",
                "spring.datasource.password",
                "application.security.jwt.secret-key",
                "application.security.jwt.expiration"
        );

        boolean hasErrors = false;

        for(String key : requiredKeys) {
            String value = env.getProperty(key);


            if(isValid(key, value, isDevProfileActive)) {
                log.info("{}: {}", key, maskSecret(key, value));
            } else {
                log.error("{}: {}", key, value);
                hasErrors = true;
            }
        }

        if(hasErrors) {
            log.error("Application startup failed due to missing or invalid configuration!");
            throw  new RuntimeException("Application startup failed due to missing or invalid configuration!");
        }

        checkDatabaseConnection(env);

        log.info("Application startup completed successfully!");
    }


    private void checkDatabaseConnection(ConfigurableEnvironment env) {
        String url = env.getProperty("spring.datasource.url");
        String username = env.getProperty("spring.datasource.username");
        String password = env.getProperty("spring.datasource.password");

        log.info("Checking database connection...");

        try (Connection connection = DriverManager.getConnection(url, username, password)) {

            if(!connection.isValid(2)) {
                throw new RuntimeException("Database connection is not valid!");
            }
            log.info("Database connection established successfully!");
        } catch (Exception e) {
            throw new RuntimeException("Database connection failed!", e);
        }
    }

    private boolean isValid(String key, String value, boolean isDevProfileActive) {
        if(value == null || value.startsWith("${")) {
            return false;
        }

        if( isDevProfileActive && key.equals("spring.datasource.password") && value.isEmpty()) {
            return true;
        }

        return !value.trim().isEmpty();
    }

    private String maskSecret(String key, String value) {
        if(key.toLowerCase().contains("password") || key.toLowerCase().contains("secret") || key.toLowerCase().contains("key")) {
            return "****" + (value.length() > 4 ? value.substring(value.length() - 4) : "");
        }
        return value;
    }
}
