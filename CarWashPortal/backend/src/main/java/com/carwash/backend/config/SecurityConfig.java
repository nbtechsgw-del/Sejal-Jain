package com.carwash.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // =========================
    // PASSWORD ENCODER
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // =========================
    // SECURITY CONFIGURATION
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                // Disable CSRF for REST APIs
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(cors -> {})

                // Authorization rules
                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // ADMIN
                        // =========================

                        .requestMatchers(
                                "/api/admin/register",
                                "/api/admin/login"
                        ).permitAll()


                        // =========================
                        // CUSTOMER
                        // =========================

                        .requestMatchers(
                                "/api/customers/**"
                        ).permitAll()


                        // =========================
                        // SERVICES
                        // =========================

                        .requestMatchers(
                                "/api/services/**"
                        ).permitAll()


                        // =========================
                        // BOOKINGS
                        // =========================

                        .requestMatchers(
                                "/api/bookings/**"
                        ).permitAll()


                        // =========================
                        // PAYMENTS
                        // =========================

                        .requestMatchers(
                                "/api/payments/**"
                        ).permitAll()


                        // =========================
                        // INVOICES
                        // =========================

                        .requestMatchers(
                                "/api/invoices/**"
                        ).permitAll()


                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest().permitAll()
                );

        return http.build();
    }
}