package com.contiq.fileservice.service;

import com.contiq.fileservice.constants.Constants;
import com.contiq.fileservice.dto.FileDto;
import com.contiq.fileservice.dto.FileRequestDto;
import com.contiq.fileservice.dto.GDriveFileMeta;
import com.contiq.fileservice.entity.FileDB;
import com.contiq.fileservice.entity.Page;
import com.contiq.fileservice.exception.FileNotFoundException;
import com.contiq.fileservice.repository.FileDBRepository;
import com.contiq.fileservice.repository.FileRepository;
import com.contiq.fileservice.utils.Helpers;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.contiq.fileservice.utils.Constant.FILES_UPLOAD_FAILED;
import static com.contiq.fileservice.utils.Constant.FILES_UPLOAD_SUCCESSFULL;

import com.contiq.fileservice.utils.ThumbnailUtil;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

  private final ModelMapper modelMapper;
  private final Path root = Paths.get("uploads");
  @Autowired private FileDBRepository fileRepository;
  @Autowired private GoogleDriveService googleDriveService;
  @Autowired private Helpers helpers;

  @Autowired
  public FileServiceImpl() {
    this.modelMapper = new ModelMapper();
  }

  @Override
  public void init() {
    try {
      Files.createDirectories(root);
    } catch (IOException e) {
      throw new RuntimeException("Could not initialize folder for upload!");
    }
  }

  @Override
  public ByteArrayResource getByFileId(int fileId) {
    FileDB file =
        fileRepository
            .findById(fileId)
            .orElseThrow(() -> new FileNotFoundException("File not found with id: " + fileId));
    return new ByteArrayResource(file.getContent());
  }

  @Override
  public ResponseEntity<Integer> uploadFile(FileRequestDto fileRequestDto) {
    FileDB theFileDB;
    try {
      byte[] thumbnail = ThumbnailUtil.generateThumbnail(fileRequestDto.getContent());

      log.warn("File request" + fileRequestDto.getType());
      Optional<FileDB> existingFile =
          fileRepository.findByNameAndUploadedBy(
              fileRequestDto.getName(), fileRequestDto.getUserId());
      if (existingFile.isPresent()) {
        FileDB fileDB = existingFile.get();
        fileDB.setContent(fileRequestDto.getContent().getBytes());
        theFileDB = fileRepository.save(fileDB);
        return new ResponseEntity<>(theFileDB.getId(), HttpStatus.OK);
      }
      FileDB file =
              FileDB.builder()
                      .name(fileRequestDto.getName())
                      .type(fileRequestDto.getType())
                      .thumbnail(thumbnail)
                      .content(fileRequestDto.getContent().getBytes())
                      .uploadedBy(fileRequestDto.getUserId())
                      .createdAt(new Timestamp(System.currentTimeMillis()))
                      .build();
      theFileDB= fileRepository.save(file);
      try {
        helpers.splitPDFAndCreateIndex(fileRequestDto.getContent().getInputStream(),fileRequestDto.getUserId(),String.valueOf(theFileDB.getId()),theFileDB.getName());
      } catch(Exception e) {
          log.error("Found Issue adding file to elastic server", e.getMessage());

      }
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<>(theFileDB.getId(), HttpStatus.OK);
  }

  @Override
  public List<FileDto> getAllFilesByUser(int userId) {
    List<FileDB> files = fileRepository.findByUploadedBy(userId);
    if (files.isEmpty()) {
      return Collections.emptyList();
    }
    return files.stream()
            .map(file -> modelMapper.map(file, FileDto.class))
            .collect(Collectors.toList());
  }

  @Override
  public List<FileDto> getAllFiles() {
    Iterable<FileDB> filesIterable = fileRepository.findAll();
    List<FileDB> files =
            StreamSupport.stream(filesIterable.spliterator(), false).collect(Collectors.toList());
    return files.stream()
            .map(file -> modelMapper.map(file, FileDto.class))
            .collect(Collectors.toList());
  }

  @Override
  public ByteArrayResource getThumbnail(int fileId) {
    Optional<FileDB> fileRes = fileRepository.findById(fileId);
    if (fileRes.isPresent()) {
      FileDB file = fileRes.get();

      return new ByteArrayResource(file.getThumbnail());
    } else {
      throw new FileNotFoundException("File not found");
    }
  }

  @Override
  public FileDto getFileDetails(int id) {
    Optional<FileDB> file = fileRepository.findById(id);
    if (file.isPresent()) {
      return modelMapper.map(file.get(), FileDto.class);
    } else {
      throw new FileNotFoundException("File not found with id " + id);
    }
  }

  @Override
  public Boolean findByNameAndUploadedBy(String name, int uploadedBy) {
    Optional<FileDB> file = fileRepository.findByNameAndUploadedBy(name, uploadedBy);
    return (file.isPresent());
  }

}