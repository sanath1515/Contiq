package com.contiq.fileservice.repository;

import com.contiq.fileservice.entity.File;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends ElasticsearchRepository<File, String> {



    List<File> findByUserId(int userId);

    List<File> findAllByName(String keyword);

    File findByName(String name);


    @Query("{\"bool\": {\"must\": [{\"bool\": {\"should\": [{\"wildcard\": {\"content\": \"*?0*\"}}, {\"wildcard\": {\"name\": \"*?0*\"}}]}}]}}")
    List<File> findByNameContainingOrContentContaining(String searchKey);

}