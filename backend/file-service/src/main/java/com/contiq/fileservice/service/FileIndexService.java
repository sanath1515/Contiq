package com.contiq.fileservice.service;

import com.contiq.fileservice.entity.Page;

import java.io.IOException;


public interface FileIndexService {

    void addPageToIndex(Page page) throws IOException;

    void createIndex() throws IOException;

    Long getLastInsertedId() throws IOException;
}
