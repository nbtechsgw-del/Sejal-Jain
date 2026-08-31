package com.carwash.backend.service;

import com.carwash.backend.entity.Payment;
import com.carwash.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(
            PaymentRepository paymentRepository) {

        this.paymentRepository = paymentRepository;
    }


    // =========================
    // CREATE PAYMENT
    // =========================

    public Payment createPayment(Payment payment) {

        // Generate transaction ID
        if (payment.getTransactionId() == null ||
                payment.getTransactionId().isBlank()) {

            payment.setTransactionId(
                    "TXN-" +
                    UUID.randomUUID()
                            .toString()
                            .substring(0, 8)
                            .toUpperCase()
            );
        }

        // Default status
        if (payment.getPaymentStatus() == null ||
                payment.getPaymentStatus().isBlank()) {

            payment.setPaymentStatus("SUCCESS");
        }

        // Payment date
        if (payment.getPaymentDate() == null) {

            payment.setPaymentDate(
                    LocalDateTime.now()
            );
        }

        return paymentRepository.save(payment);
    }


    // =========================
    // GET ALL PAYMENTS
    // =========================

    public List<Payment> getAllPayments() {

        return paymentRepository.findAll();
    }


    // =========================
    // GET PAYMENT BY ID
    // =========================

    public Optional<Payment> getPaymentById(
            Long id) {

        return paymentRepository.findById(id);
    }


    // =========================
    // GET PAYMENTS BY BOOKING
    // =========================

    public List<Payment> getPaymentsByBooking(
            Long bookingId) {

        return paymentRepository
                .findByBookingId(bookingId);
    }


    // =========================
    // UPDATE PAYMENT STATUS
    // =========================

    public Payment updatePaymentStatus(
            Long id,
            String status) {

        Payment payment =
                paymentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Payment not found with id: "
                                                + id
                                )
                        );

        payment.setPaymentStatus(status);

        return paymentRepository.save(payment);
    }


    // =========================
    // DELETE PAYMENT
    // =========================

    public void deletePayment(Long id) {

        if (!paymentRepository.existsById(id)) {

            throw new RuntimeException(
                    "Payment not found with id: " + id
            );
        }

        paymentRepository.deleteById(id);
    }
}