package com.contiq.fileservice.entity;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Document(indexName = "pdf_pages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Page {

    @Id
    private String id;
    @Field(type = FieldType.Text)
    private String fileId;
    @Field(type = FieldType.Text)
    private String pageData;
    @Field(type = FieldType.Integer)
    private int pageNumber;
    @Field(type = FieldType.Text)
    private String fileName;
    @Field(type = FieldType.Date)
    private Date uploadedDate;
    @Field(type = FieldType.Long)
    private int uploadedBy;
}
