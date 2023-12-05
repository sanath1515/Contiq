package com.contiq.fileservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileResponseDto {
    private int id;

    private String name;



    private String type;

    @JsonProperty("created_at")
    private Timestamp createdAt;



    @JsonProperty("uploaded_by")
    private int uploadedBy;

}
