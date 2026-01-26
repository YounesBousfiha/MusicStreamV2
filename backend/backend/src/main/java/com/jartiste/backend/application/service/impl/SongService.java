package com.jartiste.backend.application.service.impl;

import com.jartiste.backend.application.mapper.SongMapper;
import com.jartiste.backend.application.service.ISongService;
import com.jartiste.backend.domain.entity.Song;
import com.jartiste.backend.domain.exception.SongNotFoundException;
import com.jartiste.backend.domain.repository.SongRepository;
import com.jartiste.backend.infrastructure.storage.IFileStorageService;
import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SongService  implements ISongService {


    private final SongRepository songRepository;
    private final IFileStorageService fileStorageService;
    private final SongMapper songMapper;

    @Override
    public SongResponse save(SongRequest request) {
        String songFileName = this.fileStorageService.save(request.songFile());

        String coverFileName = null;

        log.info("songFileName: {}", songFileName);
        if(request.coverFile() != null && !request.coverFile().isEmpty()) {
            coverFileName = this.fileStorageService.save(request.coverFile());
        }

        Song song = songMapper.toEntity(request);

        song.setSongUrl(songFileName);
        song.setCoverUrl(coverFileName);

        Song savedSong = this.songRepository.save(song);

        return songMapper.toResponse(savedSong);
    }

    @Override
    public List<SongResponse> getAllSongs() {
        return this.songRepository.findAll()
                .stream()
                .map(songMapper::toResponse)
                .toList();
    }

    @Override
    public void deleteSong(Long id) {
        if(this.songRepository.existsById(id)) {
            this.songRepository.deleteById(id);
        } else {
            throw new SongNotFoundException("Song not found");
        }
    }
}
