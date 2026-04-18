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

    // GET /api/events - return all events.
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // GET /api/events/my - return the current user's events.
    @GetMapping("/my")
    public List<Event> getMyEvents() {
        return eventService.getMyEvents();
    }

    // GET /api/events/{id} - return one event by its ID.
    @GetMapping("/{id}")
    public Event getEvent(@PathVariable String id) {
        return eventService.getEvent(id);
    }

    // POST /api/events - create a new event with validation applied to the request body.
    @PostMapping
    public Event createEvent(@Valid @RequestBody CreateEventRequest request) {
        return eventService.createEvent(request);
    }

    // PUT /api/events/{id} - update an existing event with validated input.
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable String id, @Valid @RequestBody CreateEventRequest request) {
        return eventService.updateEvent(id, request);
    }

    // DELETE /api/events/{id} - remove an event by its ID.
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }

    // POST /api/events/{id}/register - register the current user for an event.
    @PostMapping("/{id}/register")
    public Event register(@PathVariable String id) {
        return eventService.register(id);
    }

    // POST /api/events/{id}/cancel - cancel the current user's registration.
    @PostMapping("/{id}/cancel")
    public Event cancelRegistration(@PathVariable String id) {
        return eventService.cancelRegistration(id);
    }
}
