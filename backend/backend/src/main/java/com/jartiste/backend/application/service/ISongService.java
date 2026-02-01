package com.jartiste.backend.application.service;

import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ISongService {

    SongResponse save(SongRequest request);

    List<SongResponse> getAllSongs();

    void deleteSong(Long id);

    SongResponse updateSong(Long id, String title, String artist, MultipartFile coverFile);
}
