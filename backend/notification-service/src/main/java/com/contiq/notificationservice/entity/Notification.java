package com.contiq.notificationservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;

    private String action;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "actor_id")
    private  int actorId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "file_id")
    private int fileId;

    @Column(name = "created_at")
    private Timestamp createdAt;

}
