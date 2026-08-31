package com.carwash.backend.controller;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.entity.Customer;
import com.carwash.backend.service.BookingService;
import com.carwash.backend.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final BookingService bookingService;

    public CustomerController(
            CustomerService customerService,
            BookingService bookingService) {

        this.customerService = customerService;
        this.bookingService = bookingService;
    }

    // Create Customer
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    // Get All Customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // View Customer Profile
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    // Delete Customer
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return "Customer deleted successfully";
    }

    // Customer Login
    @PostMapping("/login")
    public Customer loginCustomer(@RequestBody Customer customer) {

        return customerService.loginCustomer(
                customer.getEmail(),
                customer.getPassword()
        );
    }

    // Forgot Password
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {

        String token = customerService.forgotPassword(email);

        return "Password reset token generated: " + token;
    }

    // Reset Password
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {

        return customerService.resetPassword(token, newPassword);
    }

    // Update Customer Profile
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer) {

        return customerService.updateCustomer(id, customer);
    }

    // Change Password
    @PutMapping("/{id}/change-password")
    public String changePassword(
            @PathVariable Long id,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        return customerService.changePassword(
                id,
                oldPassword,
                newPassword
        );
    }

    // View Booking History
    @GetMapping("/{id}/bookings")
    public List<Booking> getBookingHistory(@PathVariable Long id) {

        return bookingService.getCustomerBookings(id);
    }
}