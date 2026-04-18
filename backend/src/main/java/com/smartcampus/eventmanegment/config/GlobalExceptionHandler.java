package com.smartcampus.eventmanegment.config;

import java.util.HashMap;
import java.util.Map;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Applies to all backend endpoints (for example: /api/events, /api/events/{id}).

    // Handles @Valid payload validation failures and returns field-level messages.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException exception) {
        // Build a map like: { "fieldName": "validation message" }.
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        // Return a consistent 400 response with both summary and field details.
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Validation failed");
        response.put("errors", fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Handles unknown routes when a client calls a non-existing endpoint URL.
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(NoHandlerFoundException exception) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Endpoint not found");
        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "Not Found");
        // Include the requested endpoint path to help clients debug invalid URLs.
        response.put("path", exception.getRequestURL());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Preserves explicit HTTP status raised by endpoint logic in controllers/services.
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException exception) {
        // Resolve the numeric status; fallback to 500 if an unknown code is provided.
        HttpStatus status = HttpStatus.resolve(exception.getStatusCode().value());
        if (status == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", exception.getReason() != null ? exception.getReason() : status.getReasonPhrase());
        response.put("status", status.value());
        response.put("error", status.getReasonPhrase());
        return ResponseEntity.status(status).body(response);
    }

    // Converts database access failures into 503 so clients can retry later.
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, Object>> handleDataAccessException(DataAccessException exception) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Database is currently unavailable");
        response.put("status", HttpStatus.SERVICE_UNAVAILABLE.value());
        response.put("error", "Service Unavailable");
        response.put("details", exception.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    // Final safety net for uncaught exceptions to avoid leaking stack traces to clients.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception exception) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "An unexpected error occurred");
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Internal Server Error");
        response.put("details", exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
