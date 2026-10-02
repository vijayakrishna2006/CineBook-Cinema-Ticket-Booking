package com.cinebook.service;

import com.cinebook.entity.Booking;
import com.cinebook.entity.Movie;
import com.cinebook.entity.Theatre;
import com.cinebook.entity.User;
import com.cinebook.repository.BookingRepository;
import com.cinebook.repository.MovieRepository;
import com.cinebook.repository.TheatreRepository;
import com.cinebook.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CineBookService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final TheatreRepository theatreRepository;
    private final BookingRepository bookingRepository;

    public CineBookService(UserRepository userRepository,
                          MovieRepository movieRepository,
                          TheatreRepository theatreRepository,
                          BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.theatreRepository = theatreRepository;
        this.bookingRepository = bookingRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Map<String, Long> getAdminStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("movies", movieRepository.count());
        stats.put("theatres", theatreRepository.count());
        stats.put("bookings", bookingRepository.count());
        stats.put("users", userRepository.count());
        return stats;
    }
}
