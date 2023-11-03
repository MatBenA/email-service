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

CREATE TABLE server_settings (
    service_name VARCHAR(80) NOT NULL,
    api_key VARCHAR(300),
    domain VARCHAR(255),
    user_id INT NOT NULL,
    selected BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);



