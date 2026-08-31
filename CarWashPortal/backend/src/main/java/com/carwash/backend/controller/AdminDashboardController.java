package com.carwash.backend.controller;

import com.carwash.backend.service.AdminDashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(
            AdminDashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }


    // =========================
    // DASHBOARD SUMMARY
    // =========================

    @GetMapping
    public AdminDashboardService.DashboardData getDashboardData() {

        return dashboardService.getDashboardData();
    }


    // =========================
    // MONTHLY REVENUE
    // =========================

    @GetMapping("/monthly-revenue")
    public List<AdminDashboardService.MonthlyRevenueData>
    getMonthlyRevenue() {

        return dashboardService.getMonthlyRevenue();
    }


    // =========================
    // BOOKING TRENDS
    // =========================

    @GetMapping("/booking-trends")
    public List<AdminDashboardService.BookingTrendData>
    getBookingTrends() {

        return dashboardService.getBookingTrends();
    }


    // =========================
    // POPULAR SERVICES
    // =========================

    @GetMapping("/popular-services")
    public List<AdminDashboardService.PopularServiceData>
    getPopularServices() {

        return dashboardService.getPopularServices();
    }


    // =========================
    // CUSTOMER GROWTH
    // =========================

    @GetMapping("/customer-growth")
    public List<AdminDashboardService.CustomerGrowthData>
    getCustomerGrowth() {

        return dashboardService.getCustomerGrowth();
    }
}