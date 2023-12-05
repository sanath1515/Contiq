package com.contiq.fileservice.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.ByteArrayResource;

@Setter
@Getter
public class SearchFile {

    private String id;
    private String fileName;
    private String PageData;
    private String keyword;
}
