package com.contiq.fileservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileRequestDto {
    private String name;
    private String type;

    private MultipartFile content;
    @JsonProperty("user_id")
    private int userId;
}
