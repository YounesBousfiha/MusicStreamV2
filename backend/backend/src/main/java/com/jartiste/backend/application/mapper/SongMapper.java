package com.jartiste.backend.application.mapper;


import com.jartiste.backend.domain.entity.Song;
import com.jartiste.backend.presentation.dto.request.SongRequest;
import com.jartiste.backend.presentation.dto.response.SongResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SongMapper {

    @Mapping(target = "songUrl", ignore = true)
    @Mapping(target = "coverUrl", ignore = true)
    Song toEntity(SongRequest songRequest);

    SongResponse toResponse(Song song);
}
