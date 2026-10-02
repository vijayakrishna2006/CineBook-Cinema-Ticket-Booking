CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) DEFAULT 'USER'
);

CREATE TABLE IF NOT EXISTS movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    duration VARCHAR(30),
    genre VARCHAR(100),
    language VARCHAR(50),
    release_date VARCHAR(50),
    rating DECIMAL(3,1) DEFAULT 0.0,
    poster_url VARCHAR(500),
    banner_url VARCHAR(500),
    status VARCHAR(30) DEFAULT 'NOW_SHOWING',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS theatres (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(100),
    address VARCHAR(500),
    screen_names VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(100) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    movie_title VARCHAR(200),
    theatre_name VARCHAR(200),
    show_time VARCHAR(50),
    booking_date VARCHAR(50),
    selected_seats VARCHAR(500),
    total_amount DOUBLE,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    booking_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);
