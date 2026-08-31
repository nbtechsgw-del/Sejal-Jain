package com.carwash.backend.repository;

import com.carwash.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findByBookingStatus(String bookingStatus);

    List<Booking> findByAssignedStaff(Long staffId);

    List<Booking> findByStatus(String status);

    boolean existsByCustomerIdAndVehicleIdAndServiceIdAndBookingDateAndBookingTimeAndStatusNot(
            Long customerId,
            Long vehicleId,
            Long serviceId,
            LocalDate bookingDate,
            LocalTime bookingTime,
            String status
    );


    // =========================
    // MONTHLY REVENUE
    // =========================

    @Query("""
        SELECT MONTH(b.bookingDate), SUM(b.totalAmount)
        FROM Booking b
        WHERE b.bookingStatus = 'COMPLETED'
        GROUP BY MONTH(b.bookingDate)
        ORDER BY MONTH(b.bookingDate)
    """)
    List<Object[]> getMonthlyRevenue();


    // =========================
    // BOOKING TRENDS
    // =========================

    @Query("""
        SELECT b.bookingDate, COUNT(b)
        FROM Booking b
        GROUP BY b.bookingDate
        ORDER BY b.bookingDate
    """)
    List<Object[]> getBookingTrends();


    // =========================
    // POPULAR SERVICES
    // =========================

    @Query("""
        SELECT b.serviceName, COUNT(b)
        FROM Booking b
        GROUP BY b.serviceName
        ORDER BY COUNT(b) DESC
    """)
    List<Object[]> getPopularServices();

}