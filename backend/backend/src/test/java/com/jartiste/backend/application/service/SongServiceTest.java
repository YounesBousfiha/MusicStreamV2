package com.jartiste.backend.application.service;


import com.jartiste.backend.application.mapper.SongMapper;
import com.jartiste.backend.application.service.impl.SongService;
import com.jartiste.backend.domain.entity.Song;
import com.jartiste.backend.domain.repository.SongRepository;
import com.jartiste.backend.infrastructure.storage.IFileStorageService;
import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SongServiceTest {

    @Mock
    private SongRepository songRepository;

    @Mock
    private SongMapper songMapper;

    @Mock
    private IFileStorageService fileStorageService;

    @InjectMocks
    private SongService songService;


    @Test
    void shouldSaveSongSuccessfully() {
        // Arrange
        MockMultipartFile song = new MockMultipartFile("file", "test.mp3", "audio/mpeg", "test".getBytes());
        MockMultipartFile file = new MockMultipartFile("coverFile", "cover.jpg", "image/jpeg", "test".getBytes());
        SongRequest input = SongRequest.builder()
                .title("title")
                .artist("artist")
                .songFile(song)
                .coverFile(file)
                .build();

        Song songEntity = Song.builder()
                .id(1L)
                .title("Test Song")
                .build();

        SongResponse expected = SongResponse.builder()
                .id(1L)
                .title("Test Song")
                .build();

        when(fileStorageService.save(song)).thenReturn("test.mp3");
        when(songMapper.toEntity(input)).thenReturn(songEntity);
        when(songRepository.save(songEntity)).thenReturn(songEntity);
        when(songMapper.toResponse(songEntity)).thenReturn(expected);
        // Act
        SongResponse actual = songService.save(input);

        // Assert
        assertNotNull(actual);
        assertEquals(1L, actual.id());
        assertEquals("Test Song", actual.title());

        verify(songRepository).save(songEntity);
    }


    @Test
    void shouldGetAllSongs() {
        // Arrange
        Song song = Song.builder()
                .id(1L)
                .build();
        SongResponse response = SongResponse.builder().build();
        when(songRepository.findAll()).thenReturn(List.of(song));
        when(songMapper.toResponse(song)).thenReturn(response);

        // Act
        List<SongResponse> actual = songService.getAllSongs();
        // Assert
        assertNotNull(actual);
        assertEquals(1, actual.size());
    }
}
