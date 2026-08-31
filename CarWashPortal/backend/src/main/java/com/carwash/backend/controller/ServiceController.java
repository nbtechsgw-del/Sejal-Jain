package com.carwash.backend.controller;

import com.carwash.backend.entity.Service;
import com.carwash.backend.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PostMapping
    public ResponseEntity<Service> addService(@RequestBody Service service) {
        return ResponseEntity.ok(serviceService.addService(service));
    }

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {

        return serviceService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @RequestBody Service service) {

        return ResponseEntity.ok(
                serviceService.updateService(id, service)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {

        serviceService.deleteService(id);

        return ResponseEntity.ok("Service deleted successfully");
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Service> changeServiceStatus(
            @PathVariable Long id,
            @RequestParam Boolean active) {

        return ResponseEntity.ok(
                serviceService.changeServiceStatus(id, active)
        );
    }

    @PostMapping("/{id}/image")
public ResponseEntity<Service> uploadImage(
        @PathVariable Long id,
        @RequestParam("image") MultipartFile image) {

    try {
        return ResponseEntity.ok(
                serviceService.uploadImage(id, image)
        );
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }

    
}
@GetMapping("/search")
public ResponseEntity<List<Service>> searchServices(
        @RequestParam String name) {

    return ResponseEntity.ok(
            serviceService.searchByName(name)
    );
}

@GetMapping("/filter/max-price")
public ResponseEntity<List<Service>> filterByMaxPrice(
        @RequestParam Double price) {

    return ResponseEntity.ok(
            serviceService.filterByMaxPrice(price)
    );
}

@GetMapping("/filter/min-price")
public ResponseEntity<List<Service>> filterByMinPrice(
        @RequestParam Double price) {

    return ResponseEntity.ok(
            serviceService.filterByMinPrice(price)
    );
}
}