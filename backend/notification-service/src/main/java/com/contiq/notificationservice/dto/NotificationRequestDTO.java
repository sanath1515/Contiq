package com.contiq.notificationservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequestDTO {
    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("actor_id")
    private int actorId;

    @JsonProperty("file_id")
    private int fileId;

    private String action;

    @JsonProperty("is_read")
    private Boolean isRead;
}
