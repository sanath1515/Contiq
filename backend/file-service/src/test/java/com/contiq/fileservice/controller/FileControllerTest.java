package com.contiq.fileservice.controller;

import com.contiq.fileservice.controllers.FileController;
import com.contiq.fileservice.dto.FileDto;
import com.contiq.fileservice.dto.FileRequestDto;
import com.contiq.fileservice.dto.GDriveFileMeta;
import com.contiq.fileservice.entity.FileDB;
import com.contiq.fileservice.exception.FileNotFoundException;
import com.contiq.fileservice.service.FileSearchService;
import com.contiq.fileservice.service.FileService;
import com.contiq.fileservice.service.FileServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Timestamp;
import java.util.*;

import static com.contiq.fileservice.utils.Constant.FILES_UPLOAD_SUCCESSFULL;
import static com.contiq.fileservice.utils.Constant.MOCK_PDF_FILE_CONTENT;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FileController.class)
class FileControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    @Qualifier("fileServiceImpl")
    private FileService fileService;
    @Autowired
    private FileController fileController;
    @MockBean
    private FileServiceImpl fileServiceImpl;
    @MockBean
    private FileSearchService fileSearchService;
    MockMultipartFile multipartFile;

    @BeforeEach
    void setMockOutput() {
        byte[] fileContent = MOCK_PDF_FILE_CONTENT.getBytes();
        multipartFile = new MockMultipartFile("file", "test.pdf", "application/pdf", fileContent);
    }
    @Test
    void whenGetAllFiles_thenReturnFiles() throws Exception{
        Timestamp timestamp = null;
        FileDto file1 = new FileDto("1","file1","pdf",1,timestamp);
        FileDto file2 = new FileDto("2","file2","pdf",2,timestamp);
        List<FileDto> files = new ArrayList<>(Arrays.asList(file1,file2));

        Mockito.when(fileService.getAllFiles()).thenReturn(files);
        assertEquals(files,fileController.getAllFiles().getBody());
    }

    @Test
    void givenFileId_WhenGetByFileId_thenReturnFile() throws Exception{
        Timestamp timestamp = null;
        byte[] content = new byte[0];
        byte[] thumbnail = new byte[0];
        FileDB file = new FileDB(1,"file1",content,"pdf",timestamp,0,1,thumbnail);
        Mockito.when(fileService.getByFileId(1)).thenReturn(new ByteArrayResource(file.getContent()));
        mockMvc.perform(get("/api/files/1"))
                .andExpect(status().isOk());
    }

//    @Test
//    void givenInvalidFileId_WhenGetByFileId_thenThrowException() throws Exception{
//        Mockito.when(fileService.getByFileId(1)).thenThrow(FileNotFoundException.class);
//        MvcResult mvcResult = mockMvc.perform(get("/api/files/1"))
//                .andExpect(status().isNotFound())
//                .andReturn();
//        assertEquals(404,mvcResult.getResponse().getStatus());
//    }

    @Test
    void givenInvalidUserId_whenGetAllFiles_thenThrowException() throws Exception{
        Mockito.when(fileService.getAllFilesByUser(1)).thenThrow(NullPointerException.class);
        MvcResult mvcResult =mockMvc.perform(get("/api/files?userId=1")).andReturn();
        assertEquals(200,mvcResult.getResponse().getStatus());
    }

    @Test
    void uploadFileTest() throws Exception {
        int userId = 1;
        FileRequestDto fileRequestDto = new FileRequestDto("","",multipartFile,1);
        Mockito.when(fileServiceImpl.uploadFile(fileRequestDto)).thenReturn(ResponseEntity.ok(0));

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files/upload")
                        .file(multipartFile)
                        .param("userId", String.valueOf(userId))
                        .param("fileId", "456")
                        .param("thumbnail",""))
                .andExpect(status().isBadRequest());
    }
    @Test
    void testGetThumbnail() {
        // Arrange
        int fileId = 1;
        ByteArrayResource resource = new ByteArrayResource("thumbnail-content".getBytes());

        when(fileService.getThumbnail(fileId)).thenReturn(resource);

        // Act
        ResponseEntity<ByteArrayResource> response = fileController.getThumbnail(fileId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(resource, response.getBody());
    }

    @Test
    void testGetFileDetails() {
        // Arrange
        int fileId = 1;
        FileDto fileDto = new FileDto();
        // Set properties of fileDto as needed

        when(fileService.getFileDetails(fileId)).thenReturn(fileDto);

        // Act
        ResponseEntity<FileDto> response = fileController.getFileDetails(fileId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(fileDto, response.getBody());
    }
    @Test
    void testGetFileByName() {
        // Arrange
        int userId = 1;
        String fileName = "test-file";

        when(fileService.findByNameAndUploadedBy(fileName, userId)).thenReturn(true);

        // Act
        ResponseEntity<String> response = fileController.getFileByName(userId, fileName);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Found", response.getBody());
    }
    @Test
    void testGetFileByNameNotFound() {
        // Arrange
        int userId = 1;
        String foundFileName = "found-file";
        String notFoundFileName = "not-found-file";

        when(fileService.findByNameAndUploadedBy(foundFileName, userId)).thenReturn(true);
        when(fileService.findByNameAndUploadedBy(notFoundFileName, userId)).thenReturn(false);

        // Act and Assert for found file
        ResponseEntity<String> foundResponse = fileController.getFileByName(userId, foundFileName);
        assertEquals(HttpStatus.OK, foundResponse.getStatusCode());
        assertEquals("Found", foundResponse.getBody());

        // Act and Assert for not found file
        ResponseEntity<String> notFoundResponse = fileController.getFileByName(userId, notFoundFileName);
        assertEquals(HttpStatus.NOT_FOUND, notFoundResponse.getStatusCode());
        assertEquals("Not Found", notFoundResponse.getBody());
    }

}
