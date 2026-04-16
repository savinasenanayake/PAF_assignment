package com.smartcampus.eventmanegment.event;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByUserStateNot(String userState);
}
