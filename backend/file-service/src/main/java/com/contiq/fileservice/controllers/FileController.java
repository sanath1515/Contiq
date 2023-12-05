package com.contiq.fileservice.controllers;

import com.contiq.fileservice.dto.FileDto;
import com.contiq.fileservice.dto.FileRequestDto;
import com.contiq.fileservice.dto.FileResponseDto;
import com.contiq.fileservice.dto.GDriveFileMeta;
import com.contiq.fileservice.exception.FileNotFoundException;
import com.contiq.fileservice.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@Slf4j
public class FileController {
  @Autowired
  @Qualifier("fileServiceImpl")
  private FileService fileService;

  @GetMapping
  public ResponseEntity<List<FileDto>> getAllFiles() {
    return new ResponseEntity<>(fileService.getAllFiles(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ByteArrayResource> getByFileId(@PathVariable int id) {
    try {
      ByteArrayResource resource = fileService.getByFileId(id);
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_PDF);
      headers.setContentLength(resource.getByteArray().length);
      return ResponseEntity.ok().headers(headers).body(resource);
    } catch (FileNotFoundException e) {
      return ResponseEntity.noContent().build();
    }
  }

    @PostMapping("/upload")
    public ResponseEntity<Integer> uploadFile( @RequestParam("name") String name,
                                              @RequestParam("type") String type,
                                              @RequestParam("user_id") int userId,
                                              @RequestParam("content") MultipartFile content
                                              ) {
        FileRequestDto fileRequestDto = new FileRequestDto(name, type, content, userId);
        log.warn("Upload file "+fileRequestDto.getContent());
        return fileService.uploadFile(fileRequestDto);
    }

  @GetMapping("/thumbnail")
  public ResponseEntity<ByteArrayResource> getThumbnail(@RequestParam("file_id") int fileId) {
    ByteArrayResource resource = fileService.getThumbnail(fileId);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_PNG);
    headers.setContentLength(resource.getByteArray().length);
    return ResponseEntity.ok().headers(headers).body(resource);
  }


  @GetMapping("/details/{id}")
  public ResponseEntity<FileDto> getFileDetails(@PathVariable int id) {
    FileDto fileDto = fileService.getFileDetails(id);
    return new ResponseEntity<>(fileDto, HttpStatus.OK);
  }

  @GetMapping("/findByName")
  public ResponseEntity<String> getFileByName(
      @RequestParam("user_id") int userId, @RequestParam("file_name") String fileName) {
    return Boolean.TRUE.equals(fileService.findByNameAndUploadedBy(fileName, userId))
        ? ResponseEntity.status(HttpStatus.OK).body("Found")
        : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");
  }
}
