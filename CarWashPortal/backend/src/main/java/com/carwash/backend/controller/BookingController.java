package com.carwash.backend.controller;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // =========================
    // CREATE BOOKING
    // =========================

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody Booking booking) {

        Booking savedBooking =
                bookingService.createBooking(booking);

        return ResponseEntity.ok(savedBooking);
    }

    // =========================
    // GET ALL BOOKINGS
    // =========================

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }

    // =========================
    // GET BOOKING BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(
            @PathVariable Long id) {

        return bookingService
                .getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // =========================
    // GET CUSTOMER BOOKINGS
    // =========================

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>>
    getBookingsByCustomer(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                bookingService.getBookingsByCustomer(
                        customerId
                )
        );
    }

    // =========================
    // GET BOOKINGS BY STATUS
    // =========================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Booking>>
    getBookingsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                bookingService.getBookingsByStatus(
                        status
                )
        );
    }

    // =========================
    // UPDATE COMPLETE BOOKING
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable Long id,
            @RequestBody Booking booking) {

        return ResponseEntity.ok(
                bookingService.updateBooking(
                        id,
                        booking
                )
        );
    }

    // =========================
    // ASSIGN STAFF
    // =========================

    @PutMapping("/{bookingId}/assign-staff/{staffId}")
    public ResponseEntity<Booking> assignStaff(
            @PathVariable Long bookingId,
            @PathVariable Long staffId) {

        return ResponseEntity.ok(
                bookingService.assignStaff(
                        bookingId,
                        staffId
                )
        );
    }

    // =========================
    // GET STAFF ASSIGNED BOOKINGS
    // =========================

    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<Booking>>
    getBookingsByStaff(
            @PathVariable Long staffId) {

        return ResponseEntity.ok(
                bookingService.getBookingsByStaff(
                        staffId
                )
        );
    }

    // =========================
    // UPDATE BOOKING STATUS
    // =========================

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking>
    updateBookingStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                bookingService.updateBookingStatus(
                        id,
                        status
                )
        );
    }

    // =========================
    // CANCEL BOOKING
    // =========================

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking>
    cancelBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.cancelBooking(id)
        );
    }

    // =========================
    // DELETE ONE BOOKING
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteBooking(
            @PathVariable Long id) {

        bookingService.deleteBooking(id);

        return ResponseEntity.ok(
                "Booking deleted successfully"
        );
    }

    // =========================
    // DELETE ALL BOOKINGS
    // TEMPORARY
    // =========================

    @DeleteMapping("/all")
    public ResponseEntity<String>
    deleteAllBookings() {

        bookingService.deleteAllBookings();

        return ResponseEntity.ok(
                "All bookings deleted successfully"
        );
    }
}