package com.jartiste.backend.infrastructure.storage.Impl;


import com.jartiste.backend.infrastructure.storage.IFileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
@Service
public class LocalFileStorageService implements IFileStorageService {

    private static final String UPLOAD_DIR = "uploads/";

    private final Path rootLocation = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();

    public LocalFileStorageService() {
        try {
            Files.createDirectories(rootLocation);
        } catch (Exception e) {
            throw new RuntimeException("Could not initialize storage directory: " + rootLocation, e);
        }
    }
    @Override
    public String save(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), rootLocation.resolve(fileName));
            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename() + ". Please try again!", e);
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read file " + filename);
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not load file " + filename);
        }
    }

    @Override
    public void delete(String filename) {
        try {
            Files.deleteIfExists(rootLocation.resolve(filename));
        } catch (IOException e) {
            log.error("Could not delete file: {}", filename);
        }
    }
}
