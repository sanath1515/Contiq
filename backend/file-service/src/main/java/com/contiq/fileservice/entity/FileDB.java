package com.contiq.fileservice.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "files")
@Builder
public class FileDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Lob
    private byte[] content;

    private String type;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "is_deleted")
    private int isDeleted;

    @Column(name = "uploaded_by")
    private int uploadedBy;

    @Lob
    private byte[] thumbnail;
}
