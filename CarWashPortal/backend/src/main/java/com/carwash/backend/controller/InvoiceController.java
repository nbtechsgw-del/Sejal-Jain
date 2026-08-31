package com.carwash.backend.controller;

import com.carwash.backend.service.InvoiceService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceService invoiceService;


    public InvoiceController(
            InvoiceService invoiceService) {

        this.invoiceService = invoiceService;
    }


    // =========================
    // DOWNLOAD INVOICE
    // =========================

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<byte[]> downloadInvoice(
            @PathVariable Long bookingId) {

        byte[] pdf =
                invoiceService.generateInvoice(
                        bookingId
                );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=invoice-"
                                + bookingId
                                + ".pdf"
                )
                .contentType(
                        MediaType.APPLICATION_PDF
                )
                .body(pdf);
    }
}