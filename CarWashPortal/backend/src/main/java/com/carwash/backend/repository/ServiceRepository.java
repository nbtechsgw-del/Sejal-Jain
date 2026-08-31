package com.carwash.backend.repository;

import com.carwash.backend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByNameContainingIgnoreCase(String name);
    List<Service> findByPriceLessThanEqual(Double price);

List<Service> findByPriceGreaterThanEqual(Double price);

}