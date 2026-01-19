package com.jartiste.backend.application.service;

import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;

public interface ISongService {

    public SongResponse save(SongRequest request);
}
