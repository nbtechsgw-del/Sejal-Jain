package com.carwash.backend.controller;

import com.carwash.backend.entity.Payment;
import com.carwash.backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(
            PaymentService paymentService) {

        this.paymentService = paymentService;
    }


    // =========================
    // CREATE PAYMENT
    // =========================

    @PostMapping
    public ResponseEntity<Payment> createPayment(
            @RequestBody Payment payment) {

        return ResponseEntity.ok(
                paymentService.createPayment(payment)
        );
    }


    // =========================
    // GET ALL PAYMENTS
    // =========================

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {

        return ResponseEntity.ok(
                paymentService.getAllPayments()
        );
    }


    // =========================
    // GET PAYMENT BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @PathVariable Long id) {

        return paymentService
                .getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }


    // =========================
    // GET PAYMENTS BY BOOKING
    // =========================

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Payment>>
    getPaymentsByBooking(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                paymentService
                        .getPaymentsByBooking(bookingId)
        );
    }


    // =========================
    // UPDATE PAYMENT STATUS
    // =========================

    @PutMapping("/{id}/status")
    public ResponseEntity<Payment>
    updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                paymentService.updatePaymentStatus(
                        id,
                        status
                )
        );
    }


    // =========================
    // DELETE PAYMENT
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(
            @PathVariable Long id) {

        paymentService.deletePayment(id);

        return ResponseEntity.ok(
                "Payment deleted successfully"
        );
    }
}