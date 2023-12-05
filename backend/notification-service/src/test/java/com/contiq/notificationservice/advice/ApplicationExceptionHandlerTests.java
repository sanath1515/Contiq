package com.contiq.notificationservice.advice;

import com.contiq.notificationservice.advice.ApplicationExceptionHandler;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApplicationExceptionHandlerTests {

  private ApplicationExceptionHandler exceptionHandler;

  @BeforeEach
  void setUp() {
    exceptionHandler = new ApplicationExceptionHandler();
  }

  @Test
  void testHandleNotificationNotFoundException() {
    String errorMessage = "Notification not found with id: 123";
    NotificationNotFoundException exception = new NotificationNotFoundException(errorMessage);
    Map<String, String> errorMap = exceptionHandler.handleNotificationNotFoundException(exception);
    assertNotNull(errorMap);
    assertEquals(1, errorMap.size());
    assertTrue(errorMap.containsKey("Some Error Occurred"));
    assertEquals(errorMessage, errorMap.get("Some Error Occurred"));
  }


}
