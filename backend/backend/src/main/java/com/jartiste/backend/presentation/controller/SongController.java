package com.jartiste.backend.presentation.controller;

import com.jartiste.backend.application.service.ISongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/songs")
public class SongController {

    private final ISongService songService;
}
