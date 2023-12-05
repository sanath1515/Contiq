package com.contiq.fileservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter

public class FileDetail {
    public String id;
    public String fileName;
    private String fileData;
    private String uploadDate;
}
