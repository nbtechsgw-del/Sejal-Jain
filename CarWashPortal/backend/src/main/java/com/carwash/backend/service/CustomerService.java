package com.carwash.backend.service;

import com.carwash.backend.entity.Customer;
import com.carwash.backend.repository.CustomerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository,
                           PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register Customer
    public Customer createCustomer(Customer customer) {

        Optional<Customer> existingCustomer =
                customerRepository.findByEmail(customer.getEmail());

        if (existingCustomer.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        customer.setPassword(
                passwordEncoder.encode(customer.getPassword())
        );

        return customerRepository.save(customer);
    }

    // Login Customer
    public Customer loginCustomer(String email, String password) {

        Optional<Customer> customerOptional =
                customerRepository.findByEmail(email);

        if (customerOptional.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        Customer customer = customerOptional.get();

        if (!passwordEncoder.matches(password, customer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return customer;
    }

    // Get All Customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get Customer By ID
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    // Update Customer
public Customer updateCustomer(Long id, Customer updatedCustomer) {

    Customer existingCustomer =
            customerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

    existingCustomer.setName(updatedCustomer.getName());
    existingCustomer.setEmail(updatedCustomer.getEmail());
    existingCustomer.setPhone(updatedCustomer.getPhone());

    // Password sirf tab update karo jab naya password diya gaya ho
    if (updatedCustomer.getPassword() != null
            && !updatedCustomer.getPassword().isBlank()) {

        existingCustomer.setPassword(
                passwordEncoder.encode(updatedCustomer.getPassword())
        );
    }

    return customerRepository.save(existingCustomer);
}

    // Delete Customer
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    // Forgot Password
    public String forgotPassword(String email) {

        Optional<Customer> customerOptional =
                customerRepository.findByEmail(email);

        if (customerOptional.isEmpty()) {
            throw new RuntimeException("Email not registered");
        }

        Customer customer = customerOptional.get();

        // Generate unique reset token
        String resetToken = UUID.randomUUID().toString();

        // Token valid for 15 minutes
        long expiryTime =
                System.currentTimeMillis() + (15 * 60 * 1000);

        customer.setResetToken(resetToken);
        customer.setResetTokenExpiry(expiryTime);

        customerRepository.save(customer);

        return resetToken;
    }

    public String resetPassword(String token, String newPassword) {

    Optional<Customer> customerOptional =
            customerRepository.findByResetToken(token);

    if (customerOptional.isEmpty()) {
        throw new RuntimeException("Invalid reset token");
    }

    Customer customer = customerOptional.get();

    if (customer.getResetTokenExpiry() < System.currentTimeMillis()) {
        throw new RuntimeException("Reset token has expired");
    }

    customer.setPassword(
            passwordEncoder.encode(newPassword)
    );

    
    customer.setResetToken(null);
    customer.setResetTokenExpiry(null);

    customerRepository.save(customer);

    return "Password reset successfully";
}

public String changePassword(
        Long id,
        String oldPassword,
        String newPassword) {

    Customer customer = customerRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Customer not found"));

    if (!passwordEncoder.matches(
            oldPassword,
            customer.getPassword())) {

        throw new RuntimeException("Old password is incorrect");
    }

    customer.setPassword(
            passwordEncoder.encode(newPassword)
    );

    customerRepository.save(customer);

    return "Password changed successfully";
}
}