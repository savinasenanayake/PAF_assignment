package com.smartcampus.eventmanegment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootApplication
@Controller
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/")
	@ResponseBody
	public String home() {
		return "Welcome to Event Management API! Available endpoints:<br/>"
			+ "GET /api/events - Get all events<br/>"
			+ "POST /api/events - Create event<br/>"
			+ "GET /api/events/{id} - Get event by ID<br/>"
			+ "PUT /api/events/{id} - Update event<br/>"
			+ "DELETE /api/events/{id} - Delete event<br/>"
			+ "POST /api/events/{id}/register - Register for event<br/>"
			+ "POST /api/events/{id}/cancel - Cancel registration";
	}

}
