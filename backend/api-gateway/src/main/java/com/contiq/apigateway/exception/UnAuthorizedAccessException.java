package com.contiq.apigateway.exception;

public class UnAuthorizedAccessException extends RuntimeException{
    public UnAuthorizedAccessException(String message) {
        super(message);
    }
}
