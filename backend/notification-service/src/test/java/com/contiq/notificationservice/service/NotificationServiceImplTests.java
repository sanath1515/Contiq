package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.FileApiResponseDTO;
import com.contiq.notificationservice.dto.NotificationRequestDTO;
import com.contiq.notificationservice.dto.NotificationResponseDTO;
import com.contiq.notificationservice.dto.UserApiResponseDTO;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.exception.InvalidUserIdOrFileId;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.repository.NotificationRepository;
import com.contiq.notificationservice.util.ApiUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationServiceImplTests {

  @InjectMocks private NotificationServiceImpl notificationService;

  @Mock private NotificationRepository notificationRepository;

  @Mock private ModelMapper modelMapper;

  @Mock private RestTemplate restTemplate;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void testGetNotificationsByUserId() {

    int userId = 1;
    String authToken = "mockAuthToken";
    Notification notification1 = new Notification();
    NotificationResponseDTO notificationResponseDTO1 = new NotificationResponseDTO();
    when(notificationRepository.findAllByUserId(userId)).thenReturn(List.of(notification1));
    when(modelMapper.map(notification1, NotificationResponseDTO.class))
        .thenReturn(notificationResponseDTO1);

    ResponseEntity<UserApiResponseDTO> userApiResponseEntity =
        ResponseEntity.ok(new UserApiResponseDTO());
    ResponseEntity<FileApiResponseDTO> fileApiResponseEntity =
        ResponseEntity.ok(new FileApiResponseDTO());
    when(restTemplate.exchange(
            anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(UserApiResponseDTO.class)))
        .thenReturn(userApiResponseEntity);
    when(restTemplate.exchange(
            anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(FileApiResponseDTO.class)))
        .thenReturn(fileApiResponseEntity);

    List<NotificationResponseDTO> result =
        notificationService.getNotificationsByUserId(userId, authToken);

    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals(notificationResponseDTO1, result.get(0));
  }

  @Test
  void testMarkNotificationAsRead() throws NotificationNotFoundException {
    int notificationId = 1;
    Notification notification = new Notification();

    when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(notification));
    when(modelMapper.map(any(Notification.class), eq(NotificationResponseDTO.class)))
        .thenReturn(new NotificationResponseDTO());

    NotificationResponseDTO response = notificationService.markNotificationAsRead(notificationId);

    verify(notificationRepository, times(1)).findById(notificationId);
    verify(notificationRepository, times(1)).save(notification);
    verify(modelMapper, times(1)).map(any(Notification.class), eq(NotificationResponseDTO.class));
    assert (response != null);
  }

  @Test
  void testAddNotification() throws InvalidUserIdOrFileId {

    NotificationRequestDTO requestDTO = new NotificationRequestDTO();

    Notification notificationEntity = new Notification();

    NotificationResponseDTO notificationResponseDTO = new NotificationResponseDTO();

    when(modelMapper.map(requestDTO, Notification.class)).thenReturn(notificationEntity);
    when(modelMapper.map(notificationEntity, NotificationResponseDTO.class))
        .thenReturn(notificationResponseDTO);

    when(notificationRepository.save(notificationEntity)).thenReturn(notificationEntity);
    Configuration configurationMock = mock(Configuration.class);
    when(modelMapper.getConfiguration()).thenReturn(configurationMock);
    when(configurationMock.setMatchingStrategy(MatchingStrategies.STRICT))
        .thenReturn(configurationMock);

    NotificationResponseDTO responseDTO = notificationService.addNotification(requestDTO);

    verify(modelMapper, times(1)).map(requestDTO, Notification.class);

    verify(notificationRepository, times(1)).save(notificationEntity);

    assert (responseDTO != null);
  }

  @Test
  void testMarkNotificationAsRead_NotFound() {
    int notificationId = 1;

    when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());

    assertThrows(
        NotificationNotFoundException.class,
        () -> {
          notificationService.markNotificationAsRead(notificationId);
        });

    verify(notificationRepository, times(1)).findById(notificationId);
  }
}
