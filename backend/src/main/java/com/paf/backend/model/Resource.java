package com.paf.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "resources")
public class Resource {

    @Id
    private String id;

    private String name; // e.g. Hall A, Lab 1

    private ResourceType type; // LECTURE_HALL, LAB, etc.

    private int capacity;

    private String location; // IMPORTANT (assignment requirement)

    private ResourceStatus status; // ACTIVE, OUT_OF_SERVICE

    private List<String> availabilityWindows;
    // e.g. ["MONDAY 8-12", "TUESDAY 10-4"]
}