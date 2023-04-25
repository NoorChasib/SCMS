CREATE DATABASE IF NOT EXISTS SCMS;
USE SCMS;


-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(45) NOT NULL,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Camera table
CREATE TABLE camera (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- CameraInformation table
CREATE TABLE camera_information (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
  camera_id INT NOT NULL,
  url VARCHAR(255) DEFAULT NULL,
  timestamp TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (camera_id) REFERENCES camera(id)
);

-- Alerts table
CREATE TABLE alerts (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  camera_id INT NOT NULL,
  alert_type ENUM('intruder', 'offline') NOT NULL,
  start_time TIMESTAMP DEFAULT (UTC_TIMESTAMP()), 
  end_time TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),                      
  FOREIGN KEY (camera_id) REFERENCES camera(id)
);


-- Default Cameras Trigger
DELIMITER //
CREATE TRIGGER add_default_cameras
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  INSERT INTO camera (user_id, name) VALUES (NEW.id, 'Left Camera');
  SET @last_camera_id := LAST_INSERT_ID();
  INSERT INTO camera_information (camera_id, url, timestamp) VALUES (@last_camera_id, '/videos/leftCamera/playlist.m3u8', UTC_TIMESTAMP());

  INSERT INTO camera (user_id, name) VALUES (NEW.id, 'Center Camera');
  SET @last_camera_id := LAST_INSERT_ID();
  INSERT INTO camera_information (camera_id, url, timestamp) VALUES (@last_camera_id, '/videos/centerCamera/playlist.m3u8', UTC_TIMESTAMP());

  INSERT INTO camera (user_id, name) VALUES (NEW.id, 'Right Camera');
  SET @last_camera_id := LAST_INSERT_ID();
  INSERT INTO camera_information (camera_id, url, timestamp) VALUES (@last_camera_id, '/videos/rightCamera/playlist.m3u8', UTC_TIMESTAMP());
END;

//
DELIMITER ;

-- Default alert
DELIMITER //
CREATE TRIGGER add_intruder_alert
AFTER INSERT ON camera_information
FOR EACH ROW
BEGIN
  INSERT INTO alerts (user_id, camera_id, alert_type, start_time)
  SELECT
    u.id,
    c.id,
    'intruder',
    DATE_ADD(UTC_TIMESTAMP(), INTERVAL 2 MINUTE)
  FROM
    camera_information ci
    INNER JOIN camera c ON c.id = ci.camera_id
    INNER JOIN users u ON u.id = c.user_id
  WHERE
    ci.id = NEW.id
    AND c.name IN ('Left Camera', 'Center Camera', 'Right Camera');
END;
//
DELIMITER ;

