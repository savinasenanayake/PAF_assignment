package com.smartcampus.eventmanegment.config;

import com.smartcampus.eventmanegment.event.Event;
import com.smartcampus.eventmanegment.event.EventRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedData(EventRepository eventRepository) {
        return args -> {
            try {
                // Validation: skip seeding if events already exist in the database.
                // This prevents duplicate demo records every time the application starts.
                if (eventRepository.count() > 0) {
                    return;
                }

                // Seed sample events only when the table is empty.

                // Sample event 1: high-capacity technology hackathon with near-full registration.
                eventRepository.save(createEvent(
                "Tech Innovation Hackathon 2024",
                "Build practical solutions for campus life with your team in this all-day innovation challenge.",
                LocalDate.of(2026, 10, 24),
                "09:00 AM",
                "09:00 PM",
                "Computer Science Bldg, Room 402",
                "North Campus",
                150,
                142,
                "Filling Fast",
                "Technology",
                "Dr. Alan Turing",
                "REGISTERED",
                "https://app.banani.co/api/flow-image/16%3A9%0Auniversity%20tech%20hackathon%20students%20coding%20laptop%20modern%20room"));

                // Sample event 2: lecture event with waitlisted user state example.
                eventRepository.save(createEvent(
                "Guest Lecture: The Future of AI in Healthcare",
                "Guest industry talk on clinical AI systems and responsible innovation in healthcare.",
                LocalDate.of(2026, 10, 26),
                "02:00 PM",
                "04:30 PM",
                "Main Auditorium",
                "Central Campus",
                300,
                85,
                "Registration Open",
                "Lecture",
                "Prof. Maria Stone",
                "WAITLISTED",
                "https://app.banani.co/api/flow-image/16%3A9%0Auniversity%20guest%20lecture%20large%20auditorium%20speaker"));

                // Sample event 3: career fair with large venue capacity.
                eventRepository.save(createEvent(
                "Fall 2026 Campus Career Fair",
                "Meet recruiters, join quick interviews, and discover internships and graduate roles.",
                LocalDate.of(2026, 11, 2),
                "10:00 AM",
                "04:00 PM",
                "University Quad",
                "Outdoors",
                1000,
                412,
                "Registration Open",
                "Career",
                "Career Services",
                "NONE",
                "https://app.banani.co/api/flow-image/16%3A9%0Aoutdoor%20campus%20career%20fair%20tents%20students%20sunny%20day"));

                // Sample event 4: fully booked townhall for "registration full" behavior.
                eventRepository.save(createEvent(
                "Student Council Townhall Meeting",
                "Join an open discussion on upcoming campus initiatives and student priorities.",
                LocalDate.of(2026, 11, 5),
                "06:00 PM",
                "08:00 PM",
                "Student Union Center, Hall B",
                "Central Campus",
                50,
                50,
                "Registration Full",
                "Community",
                "Student Council",
                "NONE",
                "https://app.banani.co/api/flow-image/16%3A9%0Astudent%20union%20meeting%20round%20table%20discussion"));
            } catch (Exception ex) {
                // Keep application startup alive even when the database is unavailable.
                // The application can still run without demo data.
                System.out.println("Data seed skipped: " + ex.getMessage());
            }
        };
    }

    // Helper method that builds a fully populated Event object before saving.
    // This keeps the seed list readable and avoids repeating field assignments.
    private Event createEvent(
            String title,
            String description,
            LocalDate date,
            String startTime,
            String endTime,
            String location,
            String campus,
            Integer capacity,
            Integer registered,
            String status,
            String category,
            String organizer,
            String userState,
            String imageUrl) {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setDate(date);
        event.setStartTime(startTime);
        event.setEndTime(endTime);
        event.setLocation(location);
        event.setCampus(campus);
        event.setCapacity(capacity);
        event.setRegistered(registered);
        event.setStatus(status);
        event.setCategory(category);
        event.setOrganizer(organizer);
        event.setUserState(userState);
        event.setImageUrl(imageUrl);
        return event;
    }
}
