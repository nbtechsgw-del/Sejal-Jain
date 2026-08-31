package com.carwash.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carwash.backend.entity.Admin;
import com.carwash.backend.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Admin Registration
    @PostMapping("/register")
    public Admin registerAdmin(@RequestBody Admin admin) {
        return adminService.registerAdmin(admin);
    }

    // Admin Login
    @PostMapping("/login")
    public Admin loginAdmin(@RequestBody Admin admin) {

        return adminService.loginAdmin(
                admin.getEmail(),
                admin.getPassword()
        );
    }
}