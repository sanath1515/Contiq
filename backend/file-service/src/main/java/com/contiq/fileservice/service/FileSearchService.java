package com.contiq.fileservice.service;

import com.contiq.fileservice.dto.SearchResultsDTO;
import com.contiq.fileservice.entity.SearchFile;
import org.elasticsearch.search.SearchHits;

import java.io.IOException;


public interface FileSearchService {

    SearchFile[] searchByKeyword(String keyword);
    SearchResultsDTO identifyKeywordOccurences(String documentId, String keyword, String fileName ) throws IOException;
}
