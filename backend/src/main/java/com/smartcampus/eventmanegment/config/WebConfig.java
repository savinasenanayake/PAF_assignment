package com.smartcampus.eventmanegment.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Apply CORS rules only to backend API routes.
        registry.addMapping("/api/**")
                // Allow requests from the local frontend during development.
                .allowedOrigins("http://localhost:3000")
                // Validation of allowed HTTP verbs for cross-origin calls.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Accept any request headers sent by the frontend.
                .allowedHeaders("*");
    }
}
