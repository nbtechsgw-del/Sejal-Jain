package com.carwash.backend.service;

import com.carwash.backend.entity.Staff;
import com.carwash.backend.repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    // =========================
    // ADD STAFF
    // =========================

    public Staff addStaff(Staff staff) {

        if (staff.getEmail() == null ||
                staff.getEmail().isBlank()) {

            throw new RuntimeException(
                    "Email is required."
            );
        }

        if (staffRepository.existsByEmail(staff.getEmail())) {

            throw new RuntimeException(
                    "Staff with this email already exists."
            );
        }

        if (staff.getPassword() == null ||
                staff.getPassword().isBlank()) {

            throw new RuntimeException(
                    "Password is required."
            );
        }

        if (staff.getAvailabilityStatus() == null ||
                staff.getAvailabilityStatus().isBlank()) {

            staff.setAvailabilityStatus("AVAILABLE");
        }

        return staffRepository.save(staff);
    }


    // =========================
    // STAFF LOGIN
    // =========================

    public Staff loginStaff(
            String email,
            String password) {

        Staff staff =
                staffRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password."
                                )
                        );

        if (!staff.getPassword().equals(password)) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }

        return staff;
    }


    // =========================
    // GET ALL STAFF
    // =========================

    public List<Staff> getAllStaff() {

        return staffRepository.findAll();
    }


    // =========================
    // GET STAFF BY ID
    // =========================

    public Optional<Staff> getStaffById(Long id) {

        return staffRepository.findById(id);
    }


    // =========================
    // UPDATE STAFF
    // =========================

    public Staff updateStaff(
            Long id,
            Staff staff) {

        Staff existingStaff =
                staffRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Staff not found with id: " + id
                                )
                        );

        existingStaff.setFullName(
                staff.getFullName()
        );

        existingStaff.setMobileNumber(
                staff.getMobileNumber()
        );

        existingStaff.setEmail(
                staff.getEmail()
        );

        if (staff.getPassword() != null &&
                !staff.getPassword().isBlank()) {

            existingStaff.setPassword(
                    staff.getPassword()
            );
        }

        if (staff.getAvailabilityStatus() != null &&
                !staff.getAvailabilityStatus().isBlank()) {

            existingStaff.setAvailabilityStatus(
                    staff.getAvailabilityStatus()
            );
        }

        return staffRepository.save(
                existingStaff
        );
    }


    // =========================
    // UPDATE AVAILABILITY
    // =========================

    public Staff updateAvailability(
            Long id,
            String availabilityStatus) {

        Staff staff =
                staffRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Staff not found with id: " + id
                                )
                        );

        staff.setAvailabilityStatus(
                availabilityStatus
        );

        return staffRepository.save(staff);
    }


    // =========================
    // DELETE STAFF
    // =========================

    public void deleteStaff(Long id) {

        if (!staffRepository.existsById(id)) {

            throw new RuntimeException(
                    "Staff not found with id: " + id
            );
        }

        staffRepository.deleteById(id);
    }
}