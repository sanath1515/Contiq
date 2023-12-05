package com.contiq.fileservice;

import com.contiq.fileservice.service.FileIndexServiceImplementation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import java.io.IOException;
import java.text.ParseException;


@SpringBootApplication
@EnableEurekaClient
public class FileServiceApplication {

	public static void main(String[] args) throws IOException, ParseException {
		SpringApplication.run(FileServiceApplication.class, args);
	}
}
