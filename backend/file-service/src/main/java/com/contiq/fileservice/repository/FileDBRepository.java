package com.contiq.fileservice.repository;


import com.contiq.fileservice.entity.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FileDBRepository extends JpaRepository<FileDB,Integer> {

    @Query("select f.id , f.name, f.createdAt,f.uploadedBy from FileDB f where f.uploadedBy = ?1")
    List<FileDB> findByUploadedBy(int userId);

    Optional<FileDB> findByNameAndUploadedBy(String name,int uploadedBy);
}
