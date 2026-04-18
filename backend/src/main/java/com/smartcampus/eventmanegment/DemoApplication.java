package com.smartcampus.eventmanegment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootApplication
@Controller
public class DemoApplication {

	// Application entry point that bootstraps the Spring Boot context.
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// GET / - Root endpoint used as a simple API landing page/documentation summary.
	// Validation is not performed here because this endpoint accepts no request body.
	// Payload validation is applied in EventController methods that use @Valid CreateEventRequest.
	@GetMapping("/")
	@ResponseBody
	public String home() {
		// Return a simple HTML-formatted summary of available API endpoints.
		return "Welcome to Event Management API! Available endpoints:<br/>"
			// Event listing and management endpoints exposed by EventController.
			+ "GET /api/events - Get all events<br/>"
			+ "POST /api/events - Create event<br/>"
			+ "GET /api/events/{id} - Get event by ID<br/>"
			+ "PUT /api/events/{id} - Update event<br/>"
			+ "DELETE /api/events/{id} - Delete event<br/>"
			// Registration-related endpoints for a specific event.
			+ "POST /api/events/{id}/register - Register for event<br/>"
			+ "POST /api/events/{id}/cancel - Cancel registration";
	}

}
