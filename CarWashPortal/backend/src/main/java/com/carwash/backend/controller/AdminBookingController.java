package com.carwash.backend.controller;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminBookingController {

    private final BookingService bookingService;

    public AdminBookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }

    // Confirm booking
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmBooking(
            @PathVariable Long id) {

        Booking booking = bookingService
                .updateBookingStatus(id, "CONFIRMED");

        return ResponseEntity.ok(booking);
    }

    // Cancel booking
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id) {

        Booking booking = bookingService
                .updateBookingStatus(id, "CANCELLED");

        return ResponseEntity.ok(booking);
    }
}