package com.contiq.fileservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private String type;
    private int userId;
    @Lob
    private byte[] content;

    @Lob
    private byte[] thumbnail;

}
