CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  date_created timestamp default current_timestamp,
  next_watering_due_date timestamp NOT NULL,
  watering_frequency INT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date_created timestamp default current_timestamp
);

CREATE TABLE plants_users (
plant_id INT NOT NULL,
user_id INT NOT NULL,
FOREIGN KEY (plant_id) REFERENCES plants (id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY (plant_id, user_id)
);
