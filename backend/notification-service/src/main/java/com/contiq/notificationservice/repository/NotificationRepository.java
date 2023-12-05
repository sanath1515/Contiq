package com.contiq.notificationservice.repository;

import com.contiq.notificationservice.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    List<Notification> findAllByUserId(int userId);
}
