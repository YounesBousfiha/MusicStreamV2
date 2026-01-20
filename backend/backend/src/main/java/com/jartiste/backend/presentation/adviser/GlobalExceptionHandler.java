package com.jartiste.backend.presentation.adviser;


import com.jartiste.backend.domain.exception.SongNotFoundException;
import com.jartiste.backend.domain.exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.URI;
import java.time.Instant;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(UsernameNotFoundException.class)
    public ProblemDetail handleUsernameNotFoundException(UsernameNotFoundException ex) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND, ex.getMessage()
        );

        problemDetail.setTitle("User Not Found");
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("errorCode", HttpStatus.NOT_FOUND.value());

        return problemDetail;
    }


    @ExceptionHandler(UserAlreadyExistsException.class)
    public ProblemDetail handleUserAlreadyExistsException(UserAlreadyExistsException ex) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.CONFLICT, ex.getMessage()
        );

        problemDetail.setTitle("Account Registration Failed");
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("errorCode", HttpStatus.CONFLICT.value());


        return problemDetail;
    }

    @ExceptionHandler(SongNotFoundException.class)
    public ProblemDetail handleSongNotFoundException(SongNotFoundException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND,
                ex.getMessage()
        );

        problemDetail.setTitle("Song Not Found");
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("errorCode", HttpStatus.NOT_FOUND.value());

        return problemDetail;
    }
}
