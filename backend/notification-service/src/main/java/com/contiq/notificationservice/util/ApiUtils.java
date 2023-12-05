package com.contiq.notificationservice.util;

import com.contiq.notificationservice.dto.FileApiResponseDTO;
import com.contiq.notificationservice.dto.NotificationResponseDTO;
import com.contiq.notificationservice.dto.UserApiResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
@Slf4j
public class ApiUtils {
    private ApiUtils(){
    }
    public static void addFileNameAndActorName(NotificationResponseDTO notificationResponseDTO, String apiBase,RestTemplate restTemplate, String authToken) {
        HttpHeaders headers= new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION,authToken);
        log.warn("headers "+headers.toString());
        HttpEntity<?> entity = new HttpEntity<>(headers);
        log.warn("entity "+entity.toString());
        UserApiResponseDTO userApiResponseDTO=restTemplate.exchange(
                apiBase+"api/users/"+notificationResponseDTO.getActorId(),
                HttpMethod.GET,
                entity,
                UserApiResponseDTO.class
        ).getBody();
        notificationResponseDTO.setActorName(userApiResponseDTO.getUserName());
        FileApiResponseDTO fileApiResponseDTO=restTemplate.exchange(
                apiBase+"api/files/details/"+notificationResponseDTO.getFileId(),
                HttpMethod.GET,
                entity,
                FileApiResponseDTO.class
        ).getBody();
        notificationResponseDTO.setFileName(fileApiResponseDTO.getFileName());
    }
}
