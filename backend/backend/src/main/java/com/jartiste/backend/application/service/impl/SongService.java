package com.jartiste.backend.application.service.impl;

import com.jartiste.backend.application.service.ISongService;
import com.jartiste.backend.domain.repository.SongRepository;
import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SongService  implements ISongService {


    private final SongRepository songRepository;

    @Override
    public SongResponse save(SongRequest request) {
        return null;
    }
}
