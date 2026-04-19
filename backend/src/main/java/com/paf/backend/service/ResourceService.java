package com.paf.backend.service;

import com.paf.backend.model.Resource;
import com.paf.backend.model.ResourceType;
import com.paf.backend.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository repository;

    public ResourceService(ResourceRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Resource addResource(Resource resource) {
        return repository.save(resource);
    }

    // READ ALL
    public List<Resource> getAllResources() {
        return repository.findAll();
    }

    // READ BY ID
    public Resource getResourceById(String id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    public Resource updateResource(String id, Resource updatedResource) {
        Resource existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(updatedResource.getName());
            existing.setType(updatedResource.getType());
            existing.setCapacity(updatedResource.getCapacity());
            existing.setLocation(updatedResource.getLocation());
            existing.setStatus(updatedResource.getStatus());
            existing.setAvailabilityWindows(updatedResource.getAvailabilityWindows());

            return repository.save(existing);
        }

        return null;
    }

    // DELETE
    public void deleteResource(String id) {
        repository.deleteById(id);
    }

    // FILTERING
   public List<Resource> filterResourcesFlexible(
        ResourceType type,
        Integer capacity,
        String location
) {
    return getAllResources().stream()
            .filter(r -> type == null || r.getType() == type)
            .filter(r -> capacity == null || r.getCapacity() >= capacity)
            .filter(r -> location == null || r.getLocation().equalsIgnoreCase(location))
            .toList();
}
}