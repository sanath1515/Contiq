package com.contiq.notificationservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotificationNotFoundException extends Exception {
    public NotificationNotFoundException(String message) {
        super(message);
    }
}
