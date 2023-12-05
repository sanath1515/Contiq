package com.contiq.fileservice.controllers;

import com.contiq.fileservice.dto.SearchResultsDTO;
import com.contiq.fileservice.entity.SearchFile;
import com.contiq.fileservice.service.FileSearchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.test.mock.mockito.MockBean;


@WebMvcTest(FileSearchController.class)
public class FileSearchControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FileSearchService fileSearchService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSearchFilesByKeyword() throws Exception {

        SearchFile file = new SearchFile();
        file.setId("1");
        String keyword = "testKeyword";
        SearchFile[] searchFiles = new SearchFile[1];
        when(fileSearchService.searchByKeyword(keyword)).thenReturn(searchFiles);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/files/search?keyword=" + keyword))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1));
    }

    @Test
    public void testSearchKeywordOccurrences() throws Exception {

        SearchResultsDTO searchResultsDTO = new SearchResultsDTO();
        searchResultsDTO.setKeyword("repair");
        when(fileSearchService.identifyKeywordOccurences("123", "testKeyword", "testFileName")).thenReturn(searchResultsDTO);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/files/search/data?keyword=repair&fileId=123&fileName=testFilename"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}

