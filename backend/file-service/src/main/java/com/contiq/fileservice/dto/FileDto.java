package com.contiq.fileservice.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileDto {

    private String id;
    private String name;
    private String type;

    @JsonProperty("uploaded_by")
    private int uploadedBy;
    
    @JsonProperty("created_at")
    private Timestamp createdAt;

}
