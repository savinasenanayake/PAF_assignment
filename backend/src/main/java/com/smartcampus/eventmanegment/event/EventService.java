package com.smartcampus.eventmanegment.event;

import com.smartcampus.eventmanegment.event.dto.CreateEventRequest;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EventService {

    private static final Logger logger = LoggerFactory.getLogger(EventService.class);

    private static final String USER_STATE_NONE = "NONE";
    private static final String USER_STATE_REGISTERED = "REGISTERED";
    private static final String USER_STATE_WAITLISTED = "WAITLISTED";
    private static final String AUTO_IMAGE_BASE_URL = "";

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        try {
            return eventRepository.findAll().stream().sorted(Comparator.comparing(Event::getDate)).toList();
        } catch (Exception ex) {
            logger.warn("Failed to fetch events from database, returning empty list: {}", ex.getMessage());
            return List.of();
        }
    }

    public List<Event> getMyEvents() {
        try {
            return eventRepository.findByUserStateNot(USER_STATE_NONE).stream()
                    .sorted(Comparator.comparing(Event::getDate))
                    .toList();
        } catch (Exception ex) {
            logger.warn("Failed to fetch user events from database, returning empty list: {}", ex.getMessage());
            return List.of();
        }
    }

    public Event getEvent(String id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public Event createEvent(CreateEventRequest request) {
        Event event = new Event();
        applyEventRequest(event, request);
        event.setRegistered(0);
        event.setUserState(USER_STATE_NONE);
        return eventRepository.save(event);
    }

    public Event updateEvent(String id, CreateEventRequest request) {
        Event event = getEvent(id);
        applyEventRequest(event, request);
        
        // Only recalculate status if user didn't explicitly set it to "Open", "Full", or "Closed"
        String requestedStatus = request.getStatus();
        if (requestedStatus == null || requestedStatus.trim().isEmpty()) {
            recalculateStatus(event);
        }
        // For explicit status values (Open, Full, Closed), preserve user's choice
        
        return eventRepository.save(event);
    }

    public void deleteEvent(String id) {
        Event event = getEvent(id);
        eventRepository.delete(event);
    }

    public Event register(String id) {
        Event event = getEvent(id);
        if (event.getRegistered() >= event.getCapacity()) {
            event.setUserState(USER_STATE_WAITLISTED);
            event.setStatus("Registration Full");
            return eventRepository.save(event);
        }

        event.setRegistered(event.getRegistered() + 1);
        event.setUserState(USER_STATE_REGISTERED);
        if (event.getRegistered() >= event.getCapacity()) {
            event.setStatus("Registration Full");
        } else if (event.getRegistered() >= Math.round(event.getCapacity() * 0.9f)) {
            event.setStatus("Filling Fast");
        } else {
            event.setStatus("Registration Open");
        }
        return eventRepository.save(event);
    }

    public Event cancelRegistration(String id) {
        Event event = getEvent(id);
        if (USER_STATE_REGISTERED.equals(event.getUserState()) && event.getRegistered() > 0) {
            event.setRegistered(event.getRegistered() - 1);
        }
        event.setUserState(USER_STATE_NONE);
        recalculateStatus(event);
        return eventRepository.save(event);
    }

    private void applyEventRequest(Event event, CreateEventRequest request) {
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setLocation(request.getLocation());
        event.setCampus(request.getCampus());
        event.setCapacity(request.getCapacity());
        event.setCategory(request.getCategory());
        event.setOrganizer(request.getOrganizer());
        event.setStatus(request.getStatus());
        
        // Use user-provided imageUrl if available, otherwise generate auto image
        String imageUrl = request.getImageUrl();
        if (imageUrl != null && !imageUrl.trim().isEmpty()) {
            event.setImageUrl(imageUrl.trim());
        } else {
            event.setImageUrl(generateAutoImageUrl(request));
        }
    }

    private String generateAutoImageUrl(CreateEventRequest request) {
        String category = request.getCategory() == null ? "event" : request.getCategory().trim();
        String title = request.getTitle() == null ? "campus event" : request.getTitle().trim();
        String text = (category + " | " + title).replace("\n", " ");
        String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
        return AUTO_IMAGE_BASE_URL + "?text=" + encodedText;
    }

    private void recalculateStatus(Event event) {
        if (event.getRegistered() >= event.getCapacity()) {
            event.setStatus("Registration Full");
        } else if (event.getRegistered() >= Math.round(event.getCapacity() * 0.9f)) {
            event.setStatus("Filling Fast");
        } else {
            event.setStatus("Registration Open");
        }
    }
}
