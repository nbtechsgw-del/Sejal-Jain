package com.carwash.backend.service;

import com.carwash.backend.repository.BookingRepository;
import com.carwash.backend.repository.CustomerRepository;
import com.carwash.backend.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminDashboardService {

    private final CustomerRepository customerRepository;
    private final ServiceRepository serviceRepository;
    private final BookingRepository bookingRepository;

    public AdminDashboardService(
            CustomerRepository customerRepository,
            ServiceRepository serviceRepository,
            BookingRepository bookingRepository) {

        this.customerRepository = customerRepository;
        this.serviceRepository = serviceRepository;
        this.bookingRepository = bookingRepository;
    }

    public DashboardData getDashboardData() {

        long totalCustomers = customerRepository.count();

        long totalServices = serviceRepository.count();

        long totalBookings = bookingRepository.count();

        long todaysBookings = bookingRepository.findAll()
                .stream()
                .filter(booking ->
                        booking.getBookingDate() != null &&
                        booking.getBookingDate().equals(LocalDate.now()))
                .count();

        long pendingBookings = bookingRepository
                .findByBookingStatus("PENDING")
                .size();

        long completedServices = bookingRepository
                .findByBookingStatus("COMPLETED")
                .size();

        double totalRevenue = bookingRepository.findAll()
                .stream()
                .filter(booking -> booking.getTotalAmount() != null)
                .filter(booking ->
                        "COMPLETED".equalsIgnoreCase(
                                booking.getBookingStatus()))
                .mapToDouble(booking -> booking.getTotalAmount())
                .sum();

        return new DashboardData(
                totalCustomers,
                totalServices,
                totalBookings,
                todaysBookings,
                pendingBookings,
                completedServices,
                totalRevenue
        );
    }

    public List<MonthlyRevenueData> getMonthlyRevenue() {

        List<Object[]> results = bookingRepository.getMonthlyRevenue();

        List<MonthlyRevenueData> revenueData = new ArrayList<>();

        String[] months = {
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
        };

        for (Object[] row : results) {

            int month = ((Number) row[0]).intValue();

            double revenue = ((Number) row[1]).doubleValue();

            revenueData.add(
                    new MonthlyRevenueData(
                            months[month - 1],
                            revenue
                    )
            );
        }

        return revenueData;
    }

    public List<BookingTrendData> getBookingTrends() {

        List<Object[]> results = bookingRepository.getBookingTrends();

        List<BookingTrendData> trendData = new ArrayList<>();

        for (Object[] row : results) {

            LocalDate date = (LocalDate) row[0];

            long bookings = ((Number) row[1]).longValue();

            trendData.add(
                    new BookingTrendData(
                            date.toString(),
                            bookings
                    )
            );
        }

        return trendData;
    }

    public List<PopularServiceData> getPopularServices() {

        List<Object[]> results =
                bookingRepository.getPopularServices();

        List<PopularServiceData> popularServices =
                new ArrayList<>();

        for (Object[] row : results) {

            String serviceName = (String) row[0];

            long bookings = ((Number) row[1]).longValue();

            popularServices.add(
                    new PopularServiceData(
                            serviceName,
                            bookings
                    )
            );
        }

        return popularServices;
    }

    public List<CustomerGrowthData> getCustomerGrowth() {

        List<CustomerGrowthData> customerGrowth =
                new ArrayList<>();

        long totalCustomers = customerRepository.count();

        customerGrowth.add(
                new CustomerGrowthData(
                        "Current",
                        totalCustomers
                )
        );

        return customerGrowth;
    }

    public static class DashboardData {

        private long totalCustomers;
        private long totalServices;
        private long totalBookings;
        private long todaysBookings;
        private long pendingBookings;
        private long completedServices;
        private double totalRevenue;

        public DashboardData(
                long totalCustomers,
                long totalServices,
                long totalBookings,
                long todaysBookings,
                long pendingBookings,
                long completedServices,
                double totalRevenue) {

            this.totalCustomers = totalCustomers;
            this.totalServices = totalServices;
            this.totalBookings = totalBookings;
            this.todaysBookings = todaysBookings;
            this.pendingBookings = pendingBookings;
            this.completedServices = completedServices;
            this.totalRevenue = totalRevenue;
        }

        public long getTotalCustomers() {
            return totalCustomers;
        }

        public long getTotalServices() {
            return totalServices;
        }

        public long getTotalBookings() {
            return totalBookings;
        }

        public long getTodaysBookings() {
            return todaysBookings;
        }

        public long getPendingBookings() {
            return pendingBookings;
        }

        public long getCompletedServices() {
            return completedServices;
        }

        public double getTotalRevenue() {
            return totalRevenue;
        }
    }

    public static class MonthlyRevenueData {

        private String month;
        private double revenue;

        public MonthlyRevenueData(
                String month,
                double revenue) {

            this.month = month;
            this.revenue = revenue;
        }

        public String getMonth() {
            return month;
        }

        public double getRevenue() {
            return revenue;
        }
    }

    public static class BookingTrendData {

        private String date;
        private long bookings;

        public BookingTrendData(
                String date,
                long bookings) {

            this.date = date;
            this.bookings = bookings;
        }

        public String getDate() {
            return date;
        }

        public long getBookings() {
            return bookings;
        }
    }

    public static class PopularServiceData {

        private String serviceName;
        private long bookings;

        public PopularServiceData(
                String serviceName,
                long bookings) {

            this.serviceName = serviceName;
            this.bookings = bookings;
        }

        public String getServiceName() {
            return serviceName;
        }

        public long getBookings() {
            return bookings;
        }
    }

    public static class CustomerGrowthData {

        private String month;
        private long customers;

        public CustomerGrowthData(
                String month,
                long customers) {

            this.month = month;
            this.customers = customers;
        }

        public String getMonth() {
            return month;
        }

        public long getCustomers() {
            return customers;
        }
    }
}