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

    // ✅ CREATE (ADMIN ONLY)
    @PostMapping
    public Object createResource(@RequestBody Resource resource,
                                 @RequestParam String role) {

        if (!"ADMIN".equals(role)) {
            return "Access Denied: Admin only";
        }

        return service.addResource(resource);
    }

    // ✅ READ ALL (PUBLIC)
    @GetMapping
    public List<Resource> getAllResources() {
        return service.getAllResources();
    }

    // ✅ READ BY ID (PUBLIC)
    @GetMapping("/{id}")
    public Resource getResourceById(@PathVariable String id) {
        return service.getResourceById(id);
    }

    // ✅ UPDATE (ADMIN ONLY)
    @PutMapping("/{id}")
    public Object updateResource(@PathVariable String id,
                                 @RequestBody Resource resource,
                                 @RequestParam String role) {

        if (!"ADMIN".equals(role)) {
            return "Access Denied: Admin only";
        }

        return service.updateResource(id, resource);
    }

    // ✅ DELETE (ADMIN ONLY)
    @DeleteMapping("/{id}")
    public Object deleteResource(@PathVariable String id,
                                 @RequestParam String role) {

        if (!"ADMIN".equals(role)) {
            return "Access Denied: Admin only";
        }

        service.deleteResource(id);
        return "Deleted successfully";
    }

    // ✅ FILTER (PUBLIC + FLEXIBLE)
    @GetMapping("/filter")
    public List<Resource> filterResources(
            @RequestParam(required = false) ResourceType type,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) String location
    ) {
        return service.filterResourcesFlexible(type, capacity, location);
    }
}