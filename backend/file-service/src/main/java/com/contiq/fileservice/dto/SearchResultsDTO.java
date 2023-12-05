package com.contiq.fileservice.dto;

import com.contiq.fileservice.entity.Fragment;
import lombok.Getter;
import lombok.Setter;
import org.elasticsearch.common.text.Text;

import java.util.List;

@Getter
@Setter
public class SearchResultsDTO {
    String keyword;
    List<Fragment> fragmentText;
    String fileName;
    int pageNo;
}
