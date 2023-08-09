CREATE TABLE IF NOT EXISTS "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

CREATE TABLE empty_leg (
	id INTEGER PRIMARY KEY,
  departure TEXT NOT NULL,
	destination TEXT NOT NULL,
	departure_date INTEGER NOT NULL,
	max_seats INTEGER NOT NULL,
	available_seats INTEGER NOT NULL,
  reservation_open INTEGER DEFAULT TRUE,
	price INTEGER NOT NULL,
	currency TEXT NOT NULL, -- Three letter code as of https://www.xe.com/iso4217.php
  featured INTEGER DEFAULT FALSE,
  flight_number TEXT DEFAULT ''
);

INSERT INTO empty_leg(id, departure, destination,	departure_date,	max_seats, available_seats,	price, currency, featured, flight_number) SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.departure'),
  json_extract(value, '$.destination'),
  json_extract(value, '$.departure_date'),
  json_extract(value, '$.max_seats'),
  json_extract(value, '$.available_seats'),
  json_extract(value, '$.price'),
  json_extract(value, '$.currency'),
  json_extract(value, '$.featured'),
  json_extract(value, '$.flight_number')
FROM json_each(readfile('empty_leg_seed.json'));

CREATE TABLE proposed_trip (
	id INTEGER PRIMARY KEY,
  departure TEXT NOT NULL,
	destination TEXT NOT NULL,
	departure_date INTEGER NOT NULL,
  reservation_open INTEGER DEFAULT TRUE,
	no_of_passengers INTEGER DEFAULT 1,
  user_id INTEGER NOT NULL,
  price INTEGER NOT NULL,
	currency TEXT NOT NULL,
  featured INTEGER DEFAULT FALSE,
  flight_number TEXT DEFAULT '',
  FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO proposed_trip(id, departure, destination, departure_date, user_id, price, currency, featured, flight_number) SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.departure'),
  json_extract(value, '$.destination'),
  json_extract(value, '$.departure_date'),
  json_extract(value, '$.user_id'),
  json_extract(value, '$.price'),
  json_extract(value, '$.currency'),
  json_extract(value, '$.featured'),
  json_extract(value, '$.flight_number')
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
