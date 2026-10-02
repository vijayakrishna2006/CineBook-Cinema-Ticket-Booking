package com.cinebook.controller;

import com.cinebook.entity.Theatre;
import com.cinebook.repository.TheatreRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TheatreController {
    private final TheatreRepository theatreRepository;

    public TheatreController(TheatreRepository theatreRepository) {
        this.theatreRepository = theatreRepository;
    }

    @GetMapping("/theatres")
    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }
}
