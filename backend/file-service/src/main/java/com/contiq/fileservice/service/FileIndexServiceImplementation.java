package com.contiq.fileservice.service;
import com.contiq.fileservice.config.ElasticSearchClientConfig;
import com.contiq.fileservice.constants.Constants;
import com.contiq.fileservice.entity.Page;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.*;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class FileIndexServiceImplementation implements FileIndexService {

    private ElasticsearchRestTemplate elasticsearchOperations;

    private RestHighLevelClient client;

    @Autowired
    public FileIndexServiceImplementation(ElasticSearchClientConfig config) {

        client =  config.getElasticClient();
        elasticsearchOperations = new ElasticsearchRestTemplate(client);
    }

    @Override
    public void createIndex() {
        IndexOperations indexOperations = elasticsearchOperations.indexOps(Page.class);
        indexOperations.createWithMapping();
        indexOperations.putMapping(Page.class);
    }

    @Override
    public void addPageToIndex(Page page) throws IOException {

        elasticsearchOperations.save(page);
    }

    @Override
    public Long getLastInsertedId() throws IOException {
        SearchRequest searchRequest = new SearchRequest(Constants.INDEX_NAME);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        searchSourceBuilder.query(queryBuilder)
                           .sort("uploadedDate", SortOrder.DESC);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest,RequestOptions.DEFAULT);
        return searchResponse.getHits().getTotalHits().value;
    }
}