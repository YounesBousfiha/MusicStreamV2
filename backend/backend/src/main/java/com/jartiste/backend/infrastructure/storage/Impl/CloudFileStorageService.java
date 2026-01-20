package com.jartiste.backend.infrastructure.storage.Impl;


import com.jartiste.backend.infrastructure.storage.IFileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudFileStorageService implements IFileStorageService {
    @Override
    public String save(MultipartFile file) {
        return "";
    }

    @Override
    public Resource load(String filename) {
        return null;
    }

    @Override
    public void delete(String filename) {

    }
}
