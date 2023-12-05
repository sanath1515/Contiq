package com.contiq.fileservice.controllers;

import com.contiq.fileservice.dto.SearchResultsDTO;
import com.contiq.fileservice.entity.SearchFile;
import com.contiq.fileservice.service.FileSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/files/search")
public class FileSearchController {

    @Autowired
    FileSearchService fileSearchService;

    @GetMapping
    public SearchFile[] searchFilesByKeyword(@RequestParam String keyword) {
        return fileSearchService.searchByKeyword(keyword);
    }

    @GetMapping("/data")
    public SearchResultsDTO searchKeywordOccurences(@RequestParam String fileId, @RequestParam String keyword, @RequestParam String fileName) throws IOException {
        return fileSearchService.identifyKeywordOccurences(fileId,keyword,fileName);
    }
}
