package com.contiq.notificationservice.advice;

import com.contiq.notificationservice.exception.InvalidUserIdOrFileId;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotificationNotFoundException.class)
    public Map<String,String> handleNotificationNotFoundException(NotificationNotFoundException ex){
        Map<String,String> errorMap= new HashMap<>();
        errorMap.put("Some Error Occurred",ex.getMessage());
        return errorMap;
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(InvalidUserIdOrFileId.class)
    public Map<String,String> handleInvalidUserIdOrFileId(InvalidUserIdOrFileId ex){
        Map<String,String> errorMap= new HashMap<>();
        errorMap.put("Some Error Occurred",ex.getMessage());
        return errorMap;
    }
}
