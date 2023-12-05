package com.contiq.fileservice.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandlers {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(FileNotFoundException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(),e.getMessage(),System.currentTimeMillis());
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(EntityPersistenceException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(),e.getMessage(),System.currentTimeMillis());
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(RuntimeException exc) {
        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(),exc.getMessage(),System.currentTimeMillis());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
