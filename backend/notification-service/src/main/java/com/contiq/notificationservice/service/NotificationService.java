package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationRequestDTO;
import com.contiq.notificationservice.dto.NotificationResponseDTO;
import com.contiq.notificationservice.exception.InvalidUserIdOrFileId;
import com.contiq.notificationservice.exception.NotificationNotFoundException;

import java.lang.reflect.Array;
import java.util.List;

public interface NotificationService {
    List<NotificationResponseDTO>getNotificationsByUserId(int userId,String authToken);
    NotificationResponseDTO markNotificationAsRead(int notificationId) throws NotificationNotFoundException;

    NotificationResponseDTO addNotification(NotificationRequestDTO notificationRequestDTO) throws InvalidUserIdOrFileId;
}
