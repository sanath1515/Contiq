package com.contiq.fileservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class ErrorResponse {
    private int status;
    private String message;
    private Long timeStamp;
}
