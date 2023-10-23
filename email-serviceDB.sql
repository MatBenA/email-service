CREATE DATABASE EMAIL_SERVICE;
USE EMAIL_SERVICE;

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(60) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE messages (
	message_id INT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(255),
    message VARCHAR(10000),
    is_read BOOL,
    user_id INT NOT NULL,
    status_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (status_id) REFERENCES status(status_id)
);

CREATE TABLE status (
	status_id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR (40),
    PRIMARY KEY (status_id)
);

