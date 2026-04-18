package com.smartcampus.eventmanegment.event;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
// Repository interface for Event documents in MongoDB, providing CRUD operations and custom queries.
// Mongo repository for Event documents with built-in CRUD operations.
public interface EventRepository extends MongoRepository<Event, String> {

    // Returns events whose userState does not match the provided value.
    List<Event> findByUserStateNot(String userState);
}
