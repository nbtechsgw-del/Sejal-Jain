package com.carwash.backend.service;

import com.carwash.backend.entity.Service;
import com.carwash.backend.repository.ServiceRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public Service addService(Service service) {
        if (service.getActive() == null) {
            service.setActive(true);
        }

        return serviceRepository.save(service);
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public Service updateService(Long id, Service updatedService) {

        Service existingService = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        existingService.setName(updatedService.getName());
        existingService.setDescription(updatedService.getDescription());
        existingService.setPrice(updatedService.getPrice());
        existingService.setDuration(updatedService.getDuration());
        existingService.setImageUrl(updatedService.getImageUrl());
        existingService.setActive(updatedService.getActive());

        return serviceRepository.save(existingService);
    }

    public void deleteService(Long id) {

        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        serviceRepository.delete(service);
    }

    public Service changeServiceStatus(Long id, Boolean active) {

        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        service.setActive(active);

        return serviceRepository.save(service);
    }

    public Service uploadImage(Long id, MultipartFile image) throws IOException {

    Service service = serviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));

    String uploadDir = "uploads/service-images/";

    Path uploadPath = Paths.get(uploadDir);

    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }

    String fileName = image.getOriginalFilename();

    Path filePath = uploadPath.resolve(fileName);

    Files.write(filePath, image.getBytes());

    service.setImageUrl("/uploads/service-images/" + fileName);

    return serviceRepository.save(service);
}

public List<Service> searchByName(String name) {
    return serviceRepository.findByNameContainingIgnoreCase(name);
}

public List<Service> filterByMaxPrice(Double price) {
    return serviceRepository.findByPriceLessThanEqual(price);
}

public List<Service> filterByMinPrice(Double price) {
    return serviceRepository.findByPriceGreaterThanEqual(price);
}
}