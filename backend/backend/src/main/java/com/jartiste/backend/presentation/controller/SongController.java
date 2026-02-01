package com.jartiste.backend.presentation.controller;

import com.jartiste.backend.application.service.ISongService;
import com.jartiste.backend.infrastructure.storage.IFileStorageService;
import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/songs")
public class SongController {

    private final ISongService songService;
    private final IFileStorageService fileStorageService;


    @PostMapping(path = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize( "hasRole('ADMIN')")
    public ResponseEntity<SongResponse> createSong(SongRequest request) {
        return ResponseEntity.ok(songService.save(request));
    }


    @GetMapping("/all")
    public ResponseEntity<List<SongResponse>> getAllSongs() {
        return ResponseEntity.ok(songService.getAllSongs());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable long id) {
        this.songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SongResponse> updateSong(
        @PathVariable Long id,
        @RequestParam("title") String title,
        @RequestParam("artist") String artist,
        @RequestParam(value = "coverFile", required = false) MultipartFile coverFile
    ) throws IOException {

        SongResponse updatedSong = songService.updateSong(id, title, artist, coverFile);

        return ResponseEntity.ok(updatedSong);
     }

    @GetMapping("/file/{fileName:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {

        Resource resource = this.fileStorageService.load(fileName);

        String contentType = "application/octet-stream";
        try {
            if(resource.getFile().exists()) {
                contentType = Files.probeContentType(resource.getFile().toPath());
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not read file: " + fileName);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
