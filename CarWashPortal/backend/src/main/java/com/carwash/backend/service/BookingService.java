package com.carwash.backend.service;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }


    // =========================
    // CREATE BOOKING
    // =========================

    public Booking createBooking(Booking booking) {

        boolean duplicate =
                bookingRepository
                        .existsByCustomerIdAndVehicleIdAndServiceIdAndBookingDateAndBookingTimeAndStatusNot(
                                booking.getCustomerId(),
                                booking.getVehicleId(),
                                booking.getServiceId(),
                                booking.getBookingDate(),
                                booking.getBookingTime(),
                                "CANCELLED"
                        );

        if (duplicate) {
            throw new RuntimeException(
                    "You already have a booking for this date and time."
            );
        }

        // Default status
        if (booking.getStatus() == null ||
                booking.getStatus().isBlank()) {

            booking.setStatus("Pending");
        }

        if (booking.getBookingStatus() == null ||
                booking.getBookingStatus().isBlank()) {

            booking.setBookingStatus("PENDING");
        }

        return bookingRepository.save(booking);
    }


    // =========================
    // GET ALL BOOKINGS
    // =========================

    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }


    // =========================
    // GET BOOKING BY ID
    // =========================

    public Optional<Booking> getBookingById(Long id) {

        return bookingRepository.findById(id);
    }


    // =========================
    // GET BOOKINGS BY CUSTOMER
    // =========================

    public List<Booking> getBookingsByCustomer(Long customerId) {

        return bookingRepository.findByCustomerId(customerId);
    }


    // =========================
    // CUSTOMER BOOKINGS
    // Compatibility method
    // =========================

    public List<Booking> getCustomerBookings(Long customerId) {

        return bookingRepository.findByCustomerId(customerId);
    }


    // =========================
    // GET BOOKINGS BY STATUS
    // =========================

    public List<Booking> getBookingsByStatus(String status) {

        return bookingRepository.findByStatus(status);
    }


    // =========================
    // GET BOOKINGS BY STAFF
    // =========================

    public List<Booking> getBookingsByStaff(Long staffId) {

        return bookingRepository.findByAssignedStaff(staffId);
    }


    // =========================
    // UPDATE BOOKING STATUS
    // =========================

    public Booking updateBookingStatus(
            Long id,
            String status) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found with id: " + id
                                )
                        );

        String normalizedStatus =
                status.toUpperCase();

        booking.setBookingStatus(
                normalizedStatus
        );

        // Keep both status fields synchronized
        switch (normalizedStatus) {

            case "CONFIRMED":
                booking.setStatus("CONFIRMED");
                break;

            case "PENDING":
                booking.setStatus("Pending");
                break;

            case "ASSIGNED":
                booking.setStatus("ASSIGNED");
                break;

            case "IN PROGRESS":
                booking.setStatus("IN PROGRESS");
                break;

            case "COMPLETED":
                booking.setStatus("COMPLETED");
                break;

            case "CANCELLED":
                booking.setStatus("CANCELLED");
                break;

            default:
                booking.setStatus(status);
        }

        return bookingRepository.save(booking);
    }


    // =========================
    // CANCEL BOOKING
    // =========================

    public Booking cancelBooking(Long id) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found with id: " + id
                                )
                        );

        String currentStatus =
                booking.getBookingStatus();

        if (currentStatus == null) {
            throw new RuntimeException(
                    "Booking status is not available."
            );
        }

        String normalizedStatus =
                currentStatus.toUpperCase();

        // Customer can cancel only
        // PENDING or CONFIRMED bookings
        if (!normalizedStatus.equals("PENDING") &&
                !normalizedStatus.equals("CONFIRMED")) {

            throw new RuntimeException(
                    "Only PENDING or CONFIRMED bookings can be cancelled."
            );
        }

        // Update both status fields
        booking.setBookingStatus("CANCELLED");
        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }


    // =========================
    // UPDATE COMPLETE BOOKING
    // =========================

    public Booking updateBooking(
            Long id,
            Booking booking) {

        Booking existingBooking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found with id: " + id
                                )
                        );

        existingBooking.setCustomerId(
                booking.getCustomerId()
        );

        existingBooking.setServiceId(
                booking.getServiceId()
        );

        existingBooking.setServiceName(
                booking.getServiceName()
        );

        existingBooking.setVehicleId(
                booking.getVehicleId()
        );

        existingBooking.setBookingDate(
                booking.getBookingDate()
        );

        existingBooking.setBookingTime(
                booking.getBookingTime()
        );

        existingBooking.setServiceLocation(
                booking.getServiceLocation()
        );

        existingBooking.setPickupDrop(
                booking.getPickupDrop()
        );

        existingBooking.setAdditionalInstructions(
                booking.getAdditionalInstructions()
        );

        existingBooking.setAmount(
                booking.getAmount()
        );

        existingBooking.setServiceCost(
                booking.getServiceCost()
        );

        existingBooking.setAdditionalCharges(
                booking.getAdditionalCharges()
        );

        existingBooking.setGst(
                booking.getGst()
        );

        existingBooking.setTotalAmount(
                booking.getTotalAmount()
        );

        existingBooking.setAssignedStaff(
                booking.getAssignedStaff()
        );

        if (booking.getBookingStatus() != null) {
            existingBooking.setBookingStatus(
                    booking.getBookingStatus()
            );
        }

        if (booking.getStatus() != null) {
            existingBooking.setStatus(
                    booking.getStatus()
            );
        }

        return bookingRepository.save(
                existingBooking
        );
    }


    // =========================
    // ASSIGN STAFF TO BOOKING
    // =========================

    public Booking assignStaff(
            Long bookingId,
            Long staffId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found with id: "
                                                + bookingId
                                )
                        );

        booking.setAssignedStaff(staffId);

        // Once staff is assigned,
        // booking becomes ASSIGNED
        booking.setBookingStatus("ASSIGNED");
        booking.setStatus("ASSIGNED");

        return bookingRepository.save(booking);
    }


    // =========================
    // DELETE ONE BOOKING
    // =========================

    public void deleteBooking(Long id) {

        if (!bookingRepository.existsById(id)) {

            throw new RuntimeException(
                    "Booking not found with id: " + id
            );
        }

        bookingRepository.deleteById(id);
    }


    // =========================
    // DELETE ALL BOOKINGS
    // =========================

    public void deleteAllBookings() {

        bookingRepository.deleteAll();
    }
}