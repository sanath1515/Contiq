package com.contiq.fileservice.service;

import com.contiq.fileservice.dto.FileDto;
import com.contiq.fileservice.dto.FileRequestDto;
import com.contiq.fileservice.dto.GDriveFileMeta;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface FileService {
 ByteArrayResource getByFileId(int fileId);
 public void init();
 List<FileDto> getAllFilesByUser(int userId);
 ResponseEntity<Integer> uploadFile(FileRequestDto fileRequestDto);

 List<FileDto> getAllFiles();

    ByteArrayResource getThumbnail(int fileId);
    FileDto getFileDetails(int id);

    Boolean findByNameAndUploadedBy(String name,int uploadedBy);
}