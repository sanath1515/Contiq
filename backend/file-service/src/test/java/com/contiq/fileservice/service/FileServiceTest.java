package com.contiq.fileservice.service;

import co.elastic.thumbnails4j.core.ThumbnailingException;
import com.contiq.fileservice.dto.FileDto;
import com.contiq.fileservice.dto.FileRequestDto;
import com.contiq.fileservice.entity.FileDB;
import com.contiq.fileservice.exception.FileNotFoundException;
import com.contiq.fileservice.repository.FileDBRepository;
import com.contiq.fileservice.utils.Helpers;
import com.contiq.fileservice.utils.ThumbnailUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.OngoingStubbing;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class FileServiceTest {
    @Mock
    private FileDBRepository fileRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private Helpers helpers;
    @Mock
    private GoogleDriveService googleDriveService;
    @InjectMocks
    private FileServiceImpl fileService;

    @Mock
    private ThumbnailUtil thumbnailUtil;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void whenGetAllFiles_thenReturnFiles(){
        byte[] content = new byte[0];
        byte[] thumbnail = new byte[0];
        Timestamp timestamp = null;
        FileDB file1 = new FileDB(1,"file1",content,"pdf",timestamp,0,1,thumbnail);
        FileDB file2 = new FileDB(2,"file2",content,"pdf",timestamp,0,1,thumbnail);
        List<FileDB> files = new ArrayList<>(Arrays.asList(file1,file2));

        when(fileRepository.findAll()).thenReturn(files);

        FileDto fileDto1 = new FileDto("1","file1","pdf",1,timestamp);
        FileDto fileDto2 = new FileDto("2","file1","pdf",2,timestamp);
        List<FileDto> expectedFileDtos = new ArrayList<>(Arrays.asList(fileDto1,fileDto2));

        when(modelMapper.map(file1,FileDto.class)).thenReturn(fileDto1);
        when(modelMapper.map(file2,FileDto.class)).thenReturn(fileDto2);

        List<FileDto> actualFileDtos = fileService.getAllFiles();

        assertEquals(expectedFileDtos.size(),actualFileDtos.size());
    }

    @Test
    void givenFileId_WhenGetByFileId_thenReturnFile(){
        byte[] content = new byte[0];
        byte[] thumbnail = new byte[0];
        Timestamp timestamp = null;
        FileDB file = new FileDB(1,"file1",content,"pdf",timestamp,0,1,thumbnail);
        FileDto fileDto = new FileDto("1","file1","pdf",1,timestamp);
        when(fileRepository.findById(1)).thenReturn(Optional.of(file));
        when(modelMapper.map(file,FileDto.class)).thenReturn(fileDto);
        ByteArrayResource byteArrayResource = fileService.getByFileId(1);
        assertEquals(null,byteArrayResource.getFilename());
    }
//
    @Test
    void givenInvalidFileId_WhenGetByFileId_thenThrowException(){
        FileNotFoundException exception = assertThrows(FileNotFoundException.class, () -> {
            fileService.getByFileId(1);
        });
        assertEquals("File not found with id: 1",exception.getMessage());
    }
//
//
    @Test
    void givenUserId_whenGetAllFilesByUser_thenReturnFiles(){
        byte[] content = new byte[0];
        byte[] thumbnail = new byte[0];
        Timestamp timestamp = null;
        FileDB file1 = new FileDB(1,"file1",content,"pdf",timestamp,0,1,thumbnail);
        FileDB file2 = new FileDB(2,"file2",content,"pdf",timestamp,0,1,thumbnail);
        List<FileDB> files = new ArrayList<>(Arrays.asList(file1,file2));

        when(fileRepository.findAll()).thenReturn(files);
        when(fileRepository.findByUploadedBy(1)).thenReturn(files);

        FileDto fileDto1 = new FileDto("1","file1","pdf",1,timestamp);
        FileDto fileDto2 = new FileDto("2","file1","pdf",2,timestamp);
        List<FileDto> expectedFileDtos = new ArrayList<>(Arrays.asList(fileDto1,fileDto2));

        when(modelMapper.map(file1,FileDto.class)).thenReturn(fileDto1);
        when(modelMapper.map(file2,FileDto.class)).thenReturn(fileDto2);

        List<FileDto> actualFileDtos = fileService.getAllFilesByUser(1);

        assertEquals(expectedFileDtos.size(),actualFileDtos.size());
    }
//
    @Test
    void givenInvalidUserId_whenGetAllFiles_thenReturnEmptyList(){
        when(fileRepository.findByUploadedBy(1)).thenReturn(new ArrayList<>());
        assertEquals(Collections.emptyList(), fileService.getAllFilesByUser(1));
    }
//
//
    @Test
    void givenFileDto_whenSaveFile_thenReturnSavedFileDto() {
        FileDto fileDto = new FileDto();
        fileDto.setName("file1");
        fileDto.setType("pdf");
        fileDto.setId("1");

        FileDB file = new FileDB();
        file.setName("file1");
        file.setType("pdf");
        fileDto.setId("1");

        FileDB savedFile = new FileDB();
        savedFile.setName("file1");
        savedFile.setType("pdf");
        fileDto.setId("1");

        when(modelMapper.map(fileDto, FileDB.class)).thenReturn(file);
        when(fileRepository.save(file)).thenReturn(savedFile);
        when(modelMapper.map(savedFile, FileDto.class)).thenReturn(fileDto);

    }

    @Test
    void testUploadFile() throws IOException, ThumbnailingException {
        // Arrange
        File pdfFile = new File("Turing degrees.pdf");
        byte[] pdfBytes = Files.readAllBytes(pdfFile.toPath());
        MultipartFile mockMultipartFile = new MockMultipartFile("file", pdfFile.getName(), "application/pdf", pdfBytes);

        FileRequestDto fileRequestDto = new FileRequestDto();
        fileRequestDto.setName("test-file");
        fileRequestDto.setType("pdf");
        fileRequestDto.setContent(mockMultipartFile);
        fileRequestDto.setUserId(1);


        FileDB existingFileDB = new FileDB();
        existingFileDB.setId(1);

        when(fileRepository.findByNameAndUploadedBy(fileRequestDto.getName(), fileRequestDto.getUserId()))
                .thenReturn(Optional.of(existingFileDB));


        FileDB savedFileDB = new FileDB();
        savedFileDB.setId(1);
        when(fileRepository.save(any())).thenReturn(savedFileDB);

        // Act
        ResponseEntity<Integer> responseEntity = fileService.uploadFile(fileRequestDto);

        // Assert
        verify(fileRepository, times(1)).findByNameAndUploadedBy(fileRequestDto.getName(), fileRequestDto.getUserId());
        verify(fileRepository, times(1)).save(any(FileDB.class));
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(1, responseEntity.getBody());
    }
    @Test
    void testUploadFileNotExists() throws IOException, ThumbnailingException {
        // Arrange
        File pdfFile = new File("Turing degrees.pdf");
        byte[] pdfBytes = Files.readAllBytes(pdfFile.toPath());
        MultipartFile mockMultipartFile = new MockMultipartFile("file", pdfFile.getName(), "application/pdf", pdfBytes);

        FileRequestDto fileRequestDto = new FileRequestDto();
        fileRequestDto.setName("test-file");
        fileRequestDto.setType("pdf");
        fileRequestDto.setContent(mockMultipartFile);
        fileRequestDto.setUserId(1);


        FileDB existingFileDB = new FileDB();
        existingFileDB.setId(1);

        when(fileRepository.findByNameAndUploadedBy(fileRequestDto.getName(), fileRequestDto.getUserId()))
                .thenReturn(Optional.empty());


        FileDB savedFileDB = new FileDB();
        savedFileDB.setId(1);
        when(fileRepository.save(any())).thenReturn(savedFileDB);

        // Act
        ResponseEntity<Integer> responseEntity = fileService.uploadFile(fileRequestDto);

        // Assert
        verify(fileRepository, times(1)).findByNameAndUploadedBy(fileRequestDto.getName(), fileRequestDto.getUserId());
        verify(fileRepository, times(1)).save(any(FileDB.class));
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(1, responseEntity.getBody());

    }

    @Test
    void testGetThumbnailSuccess(){
        byte[] content = new byte[0];
        byte[] thumbnail = new byte[0];
        Timestamp timestamp = null;
        FileDB file = new FileDB(1,"file1",content,"pdf",timestamp,0,1,thumbnail);
        when(fileRepository.findById(1)).thenReturn(Optional.of(file));
    }
    @Test
    void testGetThumbnailFail(){
        byte[] content = new byte[0];
        byte[] thumbnail = new byte[0];
        Timestamp timestamp = null;
        FileDB file = new FileDB(1,"file1",content,"pdf",timestamp,0,1,thumbnail);
        when(fileRepository.findById(1)).thenReturn(Optional.empty());
        FileNotFoundException exception = assertThrows(FileNotFoundException.class, () -> {
            fileService.getThumbnail(1);
        });
        assertEquals("File not found",exception.getMessage());
    }
//
//
//

//

//    @Test
//    void test_uploadFile() throws Exception {
//        byte[] fileContent = MOCK_PDF_FILE_CONTENT.getBytes();
//        MultipartFile multipartFile = new MockMultipartFile("file", "test.pdf", "application/pdf", fileContent);
//        when(helpers.extractPDFAndGetContent(any())).thenReturn("adsf");
//        doNothing().when(helpers).createLocalFile(anyInt(), anyString(), any());
//        FileRequestDto fileRequestDto = new FileRequestDto("","",multipartFile,1);
//        ResponseEntity<Integer> response = fileService.uploadFile(fileRequestDto);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        verify(fileRepository, times(1)).save(any());
//    }
//
//    @Test
//    void testUploadFileWithException() throws Exception {
//        MultipartFile uploadedFile = new MockMultipartFile("file.pdf", new ByteArrayInputStream("Test file content\n".getBytes()));
//
//        when(fileRepository.save(any())).thenThrow(new RuntimeException("Failed to save file"));
//        FileRequestDto fileRequestDto = new FileRequestDto("","",uploadedFile,1);
//        ResponseEntity<Integer> response = fileService.uploadFile(fileRequestDto);
//
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//
//    }
}
