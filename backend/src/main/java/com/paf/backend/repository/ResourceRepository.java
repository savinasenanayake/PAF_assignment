package com.paf.backend.repository;

import com.paf.backend.model.Resource;
import com.paf.backend.model.ResourceType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResourceRepository extends MongoRepository<Resource, String> {

    // Find by type
    List<Resource> findByType(ResourceType type);

    // Find by capacity greater than equal
    List<Resource> findByCapacityGreaterThanEqual(int capacity);

    // Find by location
    List<Resource> findByLocation(String location);

    // Combined filtering
    List<Resource> findByTypeAndCapacityGreaterThanEqualAndLocation(
            ResourceType type,
            int capacity,
            String location
    );
}