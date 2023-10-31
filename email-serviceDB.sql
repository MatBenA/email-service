CREATE DATABASE EMAIL_SERVICE;
USE EMAIL_SERVICE;

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(60) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE messages (
	message_id INT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(255),
    message VARCHAR(10000),
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE refresh_tokens (
	user_id INT NOT NULL,
	token VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE hosters (
	hoster_id INT NOT NULL AUTO_INCREMENT,
    host VARCHAR(500),
    PRIMARY KEY (hoster_id)
);

CREATE TABLE connections (
    port INT NOT NULL DEFAULT 587,
    password VARCHAR(500) NOT NULL,
    hoster_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (hoster_id)
        REFERENCES hosters (hoster_id),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);
    