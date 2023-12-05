package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationRequestDTO;
import com.contiq.notificationservice.dto.NotificationResponseDTO;
import com.contiq.notificationservice.exception.InvalidUserIdOrFileId;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@Slf4j
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponseDTO>> getNotificationsByUserId(@RequestParam ("user_id") int userId,@RequestHeader("Authorization") String authToken){
        log.warn(authToken);
        List<NotificationResponseDTO> notificationResponseDTOS = notificationService.getNotificationsByUserId(userId,authToken);
        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseDTOS);
    }

    @PatchMapping("/{id}")
    public  ResponseEntity<NotificationResponseDTO> markNotificationAsRead(@PathVariable ("id") int notificationId) throws NotificationNotFoundException {
        NotificationResponseDTO notificationResponseDTO = notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseDTO);
    }

    @PostMapping
    public ResponseEntity<NotificationResponseDTO> addNotification(@RequestBody NotificationRequestDTO notificationRequestDTO) throws InvalidUserIdOrFileId {
        NotificationResponseDTO notificationResponseDTO = notificationService.addNotification(notificationRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationResponseDTO);
    }

}
