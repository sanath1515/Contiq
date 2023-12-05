package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationRequestDTO;
import com.contiq.notificationservice.dto.NotificationResponseDTO;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.exception.InvalidUserIdOrFileId;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.repository.NotificationRepository;
import com.contiq.notificationservice.util.ApiUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class NotificationServiceImpl implements NotificationService {
  @Autowired private ModelMapper modelMapper;
  @Autowired private NotificationRepository notificationRepository;

  @Autowired RestTemplate restTemplate;

  @Override
  public List<NotificationResponseDTO> getNotificationsByUserId(int userId, String authToken) {

    String apiBase="https://be-bc113.bootcamp64.tk/";
    List<Notification> notificationList = notificationRepository.findAllByUserId(userId);
    List<NotificationResponseDTO> notificationResponseDTOS =
        notificationList.stream()
            .map(notification -> modelMapper.map(notification, NotificationResponseDTO.class))
            .collect(Collectors.toList());


    for (NotificationResponseDTO  notificationResponseDTO : notificationResponseDTOS ) {
      ApiUtils.addFileNameAndActorName(notificationResponseDTO, apiBase,restTemplate,authToken);
    }
    return notificationResponseDTOS;
  }



  @Override
  public NotificationResponseDTO markNotificationAsRead(int notificationId) throws NotificationNotFoundException {
    Optional<Notification> notificationOptional = notificationRepository.findById(notificationId);
    if (notificationOptional.isPresent()) {
      Notification notification = notificationOptional.get();
      notification.setIsRead(true);
      notificationRepository.save(notification);
      return modelMapper.map(notification, NotificationResponseDTO.class);
    }
    else {
      throw  new NotificationNotFoundException("Notification not found with id:"+notificationId);
    }
  }

  @Override
  public NotificationResponseDTO addNotification(NotificationRequestDTO notificationRequestDTO) throws InvalidUserIdOrFileId {

    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    Notification notification = modelMapper.map(notificationRequestDTO, Notification.class);
    notification.setCreatedAt(new Timestamp(System.currentTimeMillis()));
    try {
      notificationRepository.save(notification) ;
    }
    catch (DataIntegrityViolationException ex){
      throw  new InvalidUserIdOrFileId("You have provided incorrect values for user_id,file_id or actor_id");
    }
    return modelMapper.map(notification, NotificationResponseDTO.class);


  }


}
