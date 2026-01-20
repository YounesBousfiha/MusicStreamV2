package com.jartiste.backend.application.service;

import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;

import java.util.List;

public interface ISongService {

    SongResponse save(SongRequest request);
    List<SongRequest> getAllSongs();
}
