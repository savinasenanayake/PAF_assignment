package com.smartcampus.eventmanegment.event.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class CreateEventRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 120, message = "Title must be between 3 and 120 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Start time is required")
    @Pattern(
            regexp = "^([01]\\d|2[0-3]):[0-5]\\d$|^(?i)(0?[1-9]|1[0-2]):[0-5]\\d\\s?(AM|PM)$",
            message = "Start time must be in HH:mm or hh:mm AM/PM format")
    private String startTime;

    @NotBlank(message = "End time is required")
    @Pattern(
            regexp = "^([01]\\d|2[0-3]):[0-5]\\d$|^(?i)(0?[1-9]|1[0-2]):[0-5]\\d\\s?(AM|PM)$",
            message = "End time must be in HH:mm or hh:mm AM/PM format")
    private String endTime;

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must be at most 200 characters")
    private String location;

    @NotBlank(message = "Campus is required")
    @Size(max = 120, message = "Campus must be at most 120 characters")
    private String campus;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 100000, message = "Capacity must be at most 100000")
    private Integer capacity;

    @NotBlank(message = "Category is required")
    @Size(max = 80, message = "Category must be at most 80 characters")
    private String category;

    @NotBlank(message = "Organizer is required")
    @Size(max = 120, message = "Organizer must be at most 120 characters")
    private String organizer;

    @Pattern(
            regexp = "^https?:\\/\\/.+",
            message = "Image URL must start with http:// or https://")
    private String imageUrl;

    @NotBlank(message = "Status is required")
    @Pattern(
            regexp = "^(Open|Full|Closed)$",
            message = "Status must be Open, Full, or Closed")
    private String status;

    @AssertTrue(message = "End time must be after start time")
    public boolean isValidTimeRange() {
        if (startTime == null || endTime == null || startTime.isBlank() || endTime.isBlank()) {
            return true;
        }

        LocalTime start = parseTime(startTime);
        LocalTime end = parseTime(endTime);
        if (start == null || end == null) {
            return true;
        }
        return end.isAfter(start);
    }

    private LocalTime parseTime(String value) {
        try {
            if (value.toUpperCase().contains("AM") || value.toUpperCase().contains("PM")) {
                DateTimeFormatter amPmFormatter = DateTimeFormatter.ofPattern("h:mm a");
                return LocalTime.parse(value.trim().toUpperCase(), amPmFormatter);
            }

            DateTimeFormatter hourMinuteFormatter = DateTimeFormatter.ofPattern("H:mm");
            return LocalTime.parse(value.trim(), hourMinuteFormatter);
        } catch (DateTimeParseException exception) {
            return null;
        }
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
