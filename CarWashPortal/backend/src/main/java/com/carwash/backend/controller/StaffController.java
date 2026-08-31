package com.carwash.backend.controller;

import com.carwash.backend.entity.Staff;
import com.carwash.backend.service.StaffService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    // =========================
    // ADD STAFF
    // =========================

    @PostMapping
    public ResponseEntity<Staff> addStaff(
            @RequestBody Staff staff) {

        return ResponseEntity.ok(
                staffService.addStaff(staff)
        );
    }


    // =========================
    // STAFF LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> loginStaff(
            @RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        try {

            Staff staff =
                    staffService.loginStaff(
                            email,
                            password
                    );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Staff login successful"
            );

            response.put(
                    "staffId",
                    staff.getStaffId()
            );

            response.put(
                    "fullName",
                    staff.getFullName()
            );

            response.put(
                    "email",
                    staff.getEmail()
            );

            response.put(
                    "availabilityStatus",
                    staff.getAvailabilityStatus()
            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =========================
    // GET ALL STAFF
    // =========================

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {

        return ResponseEntity.ok(
                staffService.getAllStaff()
        );
    }


    // =========================
    // GET STAFF BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(
            @PathVariable Long id) {

        return staffService
                .getStaffById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }


    // =========================
    // UPDATE STAFF
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(
            @PathVariable Long id,
            @RequestBody Staff staff) {

        return ResponseEntity.ok(
                staffService.updateStaff(
                        id,
                        staff
                )
        );
    }


    // =========================
    // UPDATE AVAILABILITY
    // =========================

    @PutMapping("/{id}/availability")
    public ResponseEntity<Staff> updateAvailability(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                staffService.updateAvailability(
                        id,
                        status
                )
        );
    }


    // =========================
    // DELETE STAFF
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaff(
            @PathVariable Long id) {

        staffService.deleteStaff(id);

        return ResponseEntity.ok(
                "Staff deleted successfully"
        );
    }
}