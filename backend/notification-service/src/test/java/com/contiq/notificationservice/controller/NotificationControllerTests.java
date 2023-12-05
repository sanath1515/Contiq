package com.contiq.notificationservice.controller;
import com.contiq.notificationservice.dto.NotificationRequestDTO;
import com.contiq.notificationservice.dto.NotificationResponseDTO;
import com.contiq.notificationservice.exception.InvalidUserIdOrFileId;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

class NotificationControllerTests {

  @InjectMocks private NotificationController notificationController;

  @Mock private NotificationService notificationService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
   void testGetNotificationsByUserId() {
    int userId = 1;
    String authToken="test-token";
    List<NotificationResponseDTO> notifications =
        Arrays.asList(new NotificationResponseDTO(), new NotificationResponseDTO());

    when(notificationService.getNotificationsByUserId(userId,authToken)).thenReturn(notifications);

    ResponseEntity<List<NotificationResponseDTO>> response =
        notificationController.getNotificationsByUserId(userId,authToken);

    verify(notificationService, times(1)).getNotificationsByUserId(userId,authToken);
    assert (response.getStatusCode() == HttpStatus.OK);
    assert (response.getBody().size() == notifications.size());
  }

  @Test
   void testMarkNotificationAsRead() throws NotificationNotFoundException {
    int notificationId = 1;
    NotificationResponseDTO notification = new NotificationResponseDTO();

    when(notificationService.markNotificationAsRead(notificationId)).thenReturn(notification);

    ResponseEntity<NotificationResponseDTO> response =
        notificationController.markNotificationAsRead(notificationId);

    verify(notificationService, times(1)).markNotificationAsRead(notificationId);
    assert (response.getStatusCode() == HttpStatus.OK);
    assert (response.getBody() == notification);
  }

  @Test
   void testAddNotification() throws InvalidUserIdOrFileId {

    NotificationRequestDTO requestDTO = new NotificationRequestDTO();

    NotificationResponseDTO responseDTO = new NotificationResponseDTO();

    when(notificationService.addNotification(requestDTO)).thenReturn(responseDTO);

    ResponseEntity<NotificationResponseDTO> responseEntity =
        notificationController.addNotification(requestDTO);

    verify(notificationService, times(1)).addNotification(requestDTO);

    assert (responseEntity.getStatusCode() == HttpStatus.CREATED);

    assert (responseEntity.getBody() == responseDTO);
  }
}
