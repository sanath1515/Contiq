package com.contiq.notificationservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponseDTO {
    private  int id;

    private String action;

    @JsonProperty("is_read")
    private Boolean isRead;

    @JsonProperty("actor_id")
    private  int actorId;

    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("file_id")
    private int fileId;

    @JsonProperty("actor_name")
    private String actorName;

    @JsonProperty("file_name")
    private String fileName;

    @JsonProperty("created_at")
    private Timestamp createdAt;
}
