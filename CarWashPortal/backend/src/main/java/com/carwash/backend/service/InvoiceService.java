package com.carwash.backend.service;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.entity.Customer;
import com.carwash.backend.entity.Payment;
import com.carwash.backend.repository.BookingRepository;
import com.carwash.backend.repository.CustomerRepository;
import com.carwash.backend.repository.PaymentRepository;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class InvoiceService {

    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final PaymentRepository paymentRepository;


    public InvoiceService(
            BookingRepository bookingRepository,
            CustomerRepository customerRepository,
            PaymentRepository paymentRepository) {

        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
        this.paymentRepository = paymentRepository;
    }


    // =========================
    // GENERATE INVOICE PDF
    // =========================

    public byte[] generateInvoice(Long bookingId) {

        // -------------------------
        // Get Booking
        // -------------------------

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found with id: "
                                                + bookingId
                                )
                        );


        // -------------------------
        // Get Customer
        // -------------------------

        Customer customer =
                customerRepository.findById(
                        booking.getCustomerId()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found."
                        )
                );


        // -------------------------
        // Get Payment
        // -------------------------

        List<Payment> payments =
                paymentRepository.findByBookingId(
                        bookingId
                );

        Payment payment = null;

        if (!payments.isEmpty()) {
            payment = payments.get(0);
        }


        // -------------------------
        // Create PDF
        // -------------------------

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        PdfWriter writer =
                new PdfWriter(outputStream);

        PdfDocument pdf =
                new PdfDocument(writer);

        Document document =
                new Document(pdf);


        // =========================
        // HEADER
        // =========================

        Paragraph title =
                new Paragraph("CAR WASH PORTAL")
                        .setFontSize(24)
                        .setBold()
                        .setTextAlignment(
                                TextAlignment.CENTER
                        );

        document.add(title);


        Paragraph subtitle =
                new Paragraph("SERVICE INVOICE")
                        .setFontSize(14)
                        .setBold()
                        .setTextAlignment(
                                TextAlignment.CENTER
                        );

        document.add(subtitle);


        document.add(
                new Paragraph("\n")
        );


        // =========================
        // INVOICE INFORMATION
        // =========================

        Table invoiceInfo =
                new Table(2)
                        .useAllAvailableWidth();

        invoiceInfo.addCell(
                new Cell().add(
                        new Paragraph(
                                "Invoice Number"
                        ).setBold()
                )
        );

        invoiceInfo.addCell(
                new Cell().add(
                        new Paragraph(
                                "INV-" + booking.getId()
                        )
                )
        );


        invoiceInfo.addCell(
                new Cell().add(
                        new Paragraph(
                                "Invoice Date"
                        ).setBold()
                )
        );

        invoiceInfo.addCell(
                new Cell().add(
                        new Paragraph(
                                LocalDateTime.now()
                                        .format(
                                                DateTimeFormatter
                                                        .ofPattern(
                                                                "dd-MM-yyyy HH:mm"
                                                        )
                                        )
                        )
                )
        );

        document.add(invoiceInfo);


        document.add(
                new Paragraph("\n")
        );


        // =========================
        // CUSTOMER DETAILS
        // =========================

        document.add(
                new Paragraph(
                        "Customer Details"
                )
                .setFontSize(16)
                .setBold()
        );


        Table customerTable =
                new Table(2)
                        .useAllAvailableWidth();

        customerTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Name"
                        ).setBold()
                )
        );

        customerTable.addCell(
                new Cell().add(
                        new Paragraph(
                                safe(customer.getName())
                        )
                )
        );


        customerTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Email"
                        ).setBold()
                )
        );

        customerTable.addCell(
                new Cell().add(
                        new Paragraph(
                                safe(customer.getEmail())
                        )
                )
        );


        customerTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Phone"
                        ).setBold()
                )
        );

        customerTable.addCell(
                new Cell().add(
                        new Paragraph(
                                safe(customer.getPhone())
                        )
                )
        );


        document.add(customerTable);


        document.add(
                new Paragraph("\n")
        );


        // =========================
        // BOOKING DETAILS
        // =========================

        document.add(
                new Paragraph(
                        "Booking Details"
                )
                .setFontSize(16)
                .setBold()
        );


        Table bookingTable =
                new Table(2)
                        .useAllAvailableWidth();


        addRow(
                bookingTable,
                "Booking ID",
                String.valueOf(
                        booking.getId()
                )
        );


        addRow(
                bookingTable,
                "Service",
                safe(
                        booking.getServiceName()
                )
        );


        addRow(
                bookingTable,
                "Booking Date",
                String.valueOf(
                        booking.getBookingDate()
                )
        );


        addRow(
                bookingTable,
                "Booking Time",
                String.valueOf(
                        booking.getBookingTime()
                )
        );


        addRow(
                bookingTable,
                "Service Location",
                safe(
                        booking.getServiceLocation()
                )
        );


        addRow(
                bookingTable,
                "Booking Status",
                safe(
                        booking.getBookingStatus()
                )
        );


        document.add(bookingTable);


        document.add(
                new Paragraph("\n")
        );


        // =========================
        // PRICE DETAILS
        // =========================

        document.add(
                new Paragraph(
                        "Price Details"
                )
                .setFontSize(16)
                .setBold()
        );


        Table priceTable =
                new Table(2)
                        .useAllAvailableWidth();


        addRow(
                priceTable,
                "Service Cost",
                formatAmount(
                        booking.getServiceCost()
                )
        );


        addRow(
                priceTable,
                "Additional Charges",
                formatAmount(
                        booking.getAdditionalCharges()
                )
        );


        addRow(
                priceTable,
                "GST",
                formatAmount(
                        booking.getGst()
                )
        );


        addRow(
                priceTable,
                "Total Amount",
                formatAmount(
                        booking.getTotalAmount()
                )
        );


        document.add(priceTable);


        document.add(
                new Paragraph("\n")
        );


        // =========================
        // PAYMENT DETAILS
        // =========================

        document.add(
                new Paragraph(
                        "Payment Details"
                )
                .setFontSize(16)
                .setBold()
        );


        Table paymentTable =
                new Table(2)
                        .useAllAvailableWidth();


        if (payment != null) {

            addRow(
                    paymentTable,
                    "Payment ID",
                    String.valueOf(
                            payment.getPaymentId()
                    )
            );


            addRow(
                    paymentTable,
                    "Transaction ID",
                    safe(
                            payment.getTransactionId()
                    )
            );


            addRow(
                    paymentTable,
                    "Payment Method",
                    safe(
                            payment.getPaymentMethod()
                    )
            );


            addRow(
                    paymentTable,
                    "Payment Status",
                    safe(
                            payment.getPaymentStatus()
                    )
            );


            addRow(
                    paymentTable,
                    "Amount Paid",
                    formatAmount(
                            payment.getAmount()
                    )
            );


            addRow(
                    paymentTable,
                    "Payment Date",
                    payment.getPaymentDate() != null
                            ? payment.getPaymentDate()
                                .format(
                                    DateTimeFormatter.ofPattern(
                                        "dd-MM-yyyy HH:mm"
                                    )
                                )
                            : "N/A"
            );

        } else {

            addRow(
                    paymentTable,
                    "Payment Status",
                    "No payment record available"
            );
        }


        document.add(paymentTable);


        document.add(
                new Paragraph("\n")
        );


        // =========================
        // FOOTER
        // =========================

        Paragraph thankYou =
                new Paragraph(
                        "Thank you for choosing Car Wash Portal!"
                )
                .setBold()
                .setTextAlignment(
                        TextAlignment.CENTER
                );

        document.add(thankYou);


        document.add(
                new Paragraph(
                        "This is a computer-generated invoice."
                )
                .setFontSize(9)
                .setTextAlignment(
                        TextAlignment.CENTER
                )
        );


        // =========================
        // CLOSE PDF
        // =========================

        document.close();


        return outputStream.toByteArray();
    }


    // =========================
    // ADD TABLE ROW
    // =========================

    private void addRow(
            Table table,
            String label,
            String value) {

        table.addCell(
                new Cell().add(
                        new Paragraph(label)
                                .setBold()
                )
        );

        table.addCell(
                new Cell().add(
                        new Paragraph(
                                safe(value)
                        )
                )
        );
    }


    // =========================
    // SAFE STRING
    // =========================

    private String safe(String value) {

        return value == null ||
                value.isBlank()
                ? "N/A"
                : value;
    }


    // =========================
    // FORMAT AMOUNT
    // =========================

    private String formatAmount(
            Double amount) {

        if (amount == null) {
            return "₹0.00";
        }

        return String.format(
                "₹%.2f",
                amount
        );
    }
}