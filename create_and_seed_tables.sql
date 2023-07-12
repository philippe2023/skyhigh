CREATE TABLE user (
	id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL
);

INSERT INTO user SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.first_name'),
  json_extract(value, '$.last_name'),
  json_extract(value, '$.password'),
  json_extract(value, '$.email')
FROM json_each(readfile('user_seed.json'));

CREATE TABLE empty_leg (
	id INTEGER PRIMARY KEY,
  departure TEXT NOT NULL,
	destination TEXT NOT NULL,
	departure_date INTEGER NOT NULL,
	max_seats INTEGER NOT NULL,
	available_seats INTEGER NOT NULL,
  reservation_open INTEGER DEFAULT TRUE,
	price INTEGER NOT NULL,
	currency TEXT NOT NULL -- Three letter code as of https://www.xe.com/iso4217.php
);

INSERT INTO empty_leg(id, departure, destination,	departure_date,	max_seats, available_seats,	price, currency) SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.departure'),
  json_extract(value, '$.destination'),
  json_extract(value, '$.departure_date'),
  json_extract(value, '$.max_seats'),
  json_extract(value, '$.available_seats'),
  json_extract(value, '$.price'),
  json_extract(value, '$.currency')
FROM json_each(readfile('empty_leg_seed.json'));

CREATE TABLE proposed_trip (
	id INTEGER PRIMARY KEY,
  departure TEXT NOT NULL,
	destination TEXT NOT NULL,
	departure_date INTEGER NOT NULL,
  reservation_open INTEGER DEFAULT TRUE,
	no_of_passengers INTEGER DEFAULT 1,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO proposed_trip(id, departure, destination, departure_date, user_id) SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.departure'),
  json_extract(value, '$.destination'),
  json_extract(value, '$.departure_date'),
  json_extract(value, '$.user_id')
FROM json_each(readfile('proposed_trip_seed.json'));

CREATE TABLE booking (
	id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  empty_leg_id INTEGER DEFAULT NULL,
  proposed_trip_id INTEGER DEFAULT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(empty_leg_id) REFERENCES empty_leg(id),
  FOREIGN KEY(proposed_trip_id) REFERENCES proposed_trip(id)
);

INSERT INTO booking SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.user_id'),
  json_extract(value, '$.empty_leg_id'),
  json_extract(value, '$.proposed_trip_id')
FROM json_each(readfile('booking_seed.json'));
