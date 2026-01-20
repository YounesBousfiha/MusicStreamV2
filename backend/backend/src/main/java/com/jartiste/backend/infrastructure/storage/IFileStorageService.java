package com.jartiste.backend.infrastructure.storage;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

public interface IFileStorageService {

    String save(MultipartFile file);

    Resource load(String filename);

    void delete(String filename);
}
