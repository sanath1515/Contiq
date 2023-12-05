package com.contiq.fileservice.config;
import com.contiq.fileservice.constants.Constants;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.FileInputStream;
import java.security.KeyStore;


@Slf4j
@Component
public class ElasticSearchClientConfig {
    private final AppConfig config;

    @Autowired
    public ElasticSearchClientConfig(AppConfig config) {
        this.config = config;
    }
    public RestHighLevelClient getElasticClient()  {

        try(FileInputStream fis = new FileInputStream(this.config.getTruststorePath())) {
            KeyStore truststore = KeyStore.getInstance("JKS");
            truststore.load(fis, Constants.TRUST_STORE_PASSWORD.toCharArray());
            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(truststore);
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustManagerFactory.getTrustManagers(), null);
            ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                                                                     .connectedTo(Constants.ELASTICSEARCH_SERVER)
                                                                     .usingSsl(sslContext)
                                                                     .withBasicAuth(Constants.ELASTICSEARCH_USERNAME, Constants.ELASTICSEARCH_PASSWORD)
                                                                     .build();
            return RestClients.create(clientConfiguration).rest();
        } catch (Exception e) {
            log.error("Failed to connect to Elasticsearch server. Exception: {}", e.getMessage());
            return null;
        }
    }
}




