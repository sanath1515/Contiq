package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class GDriveFileMeta {
    private String id;
    private String name;
    private boolean is_trashed;
    private String thumbnail;
}
