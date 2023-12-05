package com.contiq.fileservice.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Configuration
public class AppConfig {

    private final Environment environment;

    @Autowired
    public AppConfig(Environment environment) {
        this.environment = environment;
    }

    public String getTruststorePath() {
        return environment.getProperty("elasticsearch.truststore.path");
    }
}
