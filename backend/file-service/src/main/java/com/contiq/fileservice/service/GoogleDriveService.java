package com.contiq.fileservice.service;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
public class GoogleDriveService {

    public ByteArrayOutputStream downloadFile(String realFileId) throws IOException {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped(List.of(DriveScopes.DRIVE));
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(
                credentials);
        Drive service = new Drive.Builder(new NetHttpTransport(),
                GsonFactory.getDefaultInstance(),
                requestInitializer)
                .setApplicationName("bc-113-contiq")
                .build();

        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            service.files().get(realFileId)
                    .executeMediaAndDownloadTo(outputStream);

            return outputStream;
        } catch (GoogleJsonResponseException e) {
            log.error("GoogleJsonResponseException occurred: {}", e.getMessage());
            throw e;
        }
    }
}
