package com.contiq.fileservice.service;

import com.contiq.fileservice.config.ElasticSearchClientConfig;
import com.contiq.fileservice.constants.Constants;
import com.contiq.fileservice.dto.SearchResultsDTO;
import com.contiq.fileservice.entity.Fragment;
import com.contiq.fileservice.entity.Page;
import com.contiq.fileservice.entity.SearchFile;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import java.util.*;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.client.RequestOptions;
import org.springframework.stereotype.Service;
import java.io.IOException;


@Service
public class FileSearchServiceImplementation implements FileSearchService {

    private ElasticsearchRestTemplate elasticsearchOperations;

    private RestHighLevelClient client;

    @Autowired
    public FileSearchServiceImplementation(ElasticSearchClientConfig config) {

        client = config.getElasticClient();
        elasticsearchOperations = new ElasticsearchRestTemplate(client);
    }

    public SearchFile[] searchByKeyword(String keyword) {
        String[] keywords = keyword.split("\\s+");
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        for (String key : keywords) {
            boolQueryBuilder.must(QueryBuilders.queryStringQuery(key));
        }
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                                        .withQuery(boolQueryBuilder)
                                        .build();
        SearchHits<Page> searchHits = elasticsearchOperations.search(searchQuery, Page.class);
        Set<String> unique_files = new HashSet<>();
        Set<SearchFile> searchFiles = new HashSet<>();
        searchHits.forEach(searchHit -> {
            String data ="";
            Page page = searchHit.getContent();
            if(!unique_files.contains(page.getFileName())) {
                SearchFile searchFile = new SearchFile();
                searchFile.setId(page.getFileId());
                searchFile.setFileName(page.getFileName());
                searchFile.setKeyword(keyword);
                searchFiles.add(searchFile);
            }
            unique_files.add(page.getFileName());
        });
        return searchFiles.toArray(new SearchFile[0]);
    }

    public SearchResultsDTO identifyKeywordOccurences(String fileId,String keyword,String fileName ) throws IOException {

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        SearchRequest searchRequest = new SearchRequest(Constants.INDEX_NAME);
        String[] keywords = keyword.split("\\s+");
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        for (String key : keywords) {
            boolQueryBuilder.must(QueryBuilders.matchQuery(Constants.DATA_FIELD, keyword));
        }
        boolQueryBuilder.must(QueryBuilders.matchQuery(Constants.FILE_IDENTIFIER, fileId));
        sourceBuilder.query(boolQueryBuilder);
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("*");
        highlightBuilder.requireFieldMatch(false);
        highlightBuilder.fragmentSize(50);
        highlightBuilder.highlightQuery(QueryBuilders.matchQuery(Constants.DATA_FIELD, keyword));
        sourceBuilder.highlighter(highlightBuilder);
        searchRequest.source(sourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchResultsDTO searchResultsDto = new SearchResultsDTO();
        List<Fragment> pdfFragments = new ArrayList<>();
        searchResultsDto.setKeyword(keyword);
        searchResultsDto.setFileName(fileName);
        if (searchResponse.getHits().getTotalHits().value > 0) {
            for (SearchHit hit : searchResponse.getHits()) {
                Map<String, HighlightField> highlightFields = hit.getHighlightFields();
                HighlightField highlight = highlightFields.get(Constants.DATA_FIELD);
                Text[] fragments = (highlight != null) ? highlight.getFragments():new Text[]{};
                int pageNumber = (int)hit.getSourceAsMap().get("pageNumber");
                for (Text fragment_text : fragments) {
                    Fragment fragment = new Fragment();
                    fragment.setPageNumber(pageNumber);
                    fragment.setText(fragment_text.string().replaceAll("\\<.*?\\>|\\n", ""));
                    pdfFragments.add(fragment);
                }
                searchResultsDto.setFragmentText(pdfFragments);
            }
        }
        return searchResultsDto;
    }
}
