package com.smartcampus.eventmanegment.event;

import com.smartcampus.eventmanegment.event.dto.CreateEventRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/my")
    public List<Event> getMyEvents() {
        return eventService.getMyEvents();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable String id) {
        return eventService.getEvent(id);
    }

    @PostMapping
    public Event createEvent(@Valid @RequestBody CreateEventRequest request) {
        return eventService.createEvent(request);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable String id, @Valid @RequestBody CreateEventRequest request) {
        return eventService.updateEvent(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }

    @PostMapping("/{id}/register")
    public Event register(@PathVariable String id) {
        return eventService.register(id);
    }

    @PostMapping("/{id}/cancel")
    public Event cancelRegistration(@PathVariable String id) {
        return eventService.cancelRegistration(id);
    }
}
