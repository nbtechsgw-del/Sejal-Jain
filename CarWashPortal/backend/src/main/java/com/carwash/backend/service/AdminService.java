package com.carwash.backend.service;

import com.carwash.backend.entity.Admin;
import com.carwash.backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Admin Registration
    public Admin registerAdmin(Admin admin) {

        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        admin.setPassword(
                passwordEncoder.encode(admin.getPassword())
        );

        return adminRepository.save(admin);
    }

    // Admin Login
    public Admin loginAdmin(String email, String password) {

    Admin admin = adminRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

    if (!passwordEncoder.matches(password, admin.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

    return admin;
}
}