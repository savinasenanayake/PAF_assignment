package com.paf.backend.controller;

import com.paf.backend.model.Resource;
import com.paf.backend.model.ResourceType;
import com.paf.backend.service.ResourceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin
public class ResourceController {

    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Resource createResource(@RequestBody Resource resource) {
        return service.addResource(resource);
    }

    // READ ALL
    @GetMapping
    public List<Resource> getAllResources() {
        return service.getAllResources();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Resource getResourceById(@PathVariable String id) {
        return service.getResourceById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable String id, @RequestBody Resource resource) {
        return service.updateResource(id, resource);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteResource(@PathVariable String id) {
        service.deleteResource(id);
    }

    // FILTER
    @GetMapping("/filter")
    public List<Resource> filterResources(
            @RequestParam ResourceType type,
            @RequestParam int capacity,
            @RequestParam String location
    ) {
        return service.filterResources(type, capacity, location);
    }
}