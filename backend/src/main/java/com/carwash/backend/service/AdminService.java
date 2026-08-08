package com.carwash.backend.service;

import org.springframework.stereotype.Service;

import com.carwash.backend.entity.Admin;
import com.carwash.backend.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
}