package com.cinebook.controller;

import com.cinebook.entity.Booking;
import com.cinebook.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class BookingController {
    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> bookingRequest) {
        Booking booking = new Booking();
        booking.setBookingId("CB-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setUserId(Long.valueOf(bookingRequest.get("userId").toString()));
        booking.setMovieId(Long.valueOf(bookingRequest.get("movieId").toString()));
        booking.setMovieTitle((String) bookingRequest.get("movieTitle"));
        booking.setTheatreName((String) bookingRequest.get("theatreName"));
        booking.setShowTime((String) bookingRequest.get("showTime"));
        booking.setBookingDate((String) bookingRequest.get("bookingDate"));
        booking.setSelectedSeats((String) bookingRequest.get("selectedSeats"));
        booking.setTotalAmount(Double.valueOf(bookingRequest.get("totalAmount").toString()));
        booking.setPaymentMethod((String) bookingRequest.get("paymentMethod"));
        booking.setPaymentStatus((String) bookingRequest.get("paymentStatus"));
        booking.setBookingStatus((String) bookingRequest.get("bookingStatus"));

        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/bookings/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/payments/process")
    public ResponseEntity<?> processPayment(@RequestBody Map<String, Object> paymentRequest) {
        String paymentMethod = String.valueOf(paymentRequest.getOrDefault("paymentMethod", "UPI"));
        String status = "SUCCESS";
        if (paymentMethod == null || paymentMethod.isBlank()) {
            status = "FAILED";
        }

        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Payment " + status.toLowerCase() + " via " + paymentMethod);
        response.put("status", status);
        return ResponseEntity.ok(response);
    }
}
