DROP TABLE IF EXISTS locations, courts, users, reservations ;  -- table names

CREATE TABLE locations  (  
  id serial NOT NULL PRIMARY KEY,
  location_name VARCHAR(100) NOT NULL,
  address VARCHAR(255),
  open_time TIME,
  close_time TIME, 
  rating FLOAT,
  thumbnail_url VARCHAR(100)
);
CREATE TABLE courts (  
  id serial NOT NULL PRIMARY KEY,
  location_id INTEGER REFERENCES locations(id),
  court_name VARCHAR(50),
  is_open BOOLEAN,
  is_mens BOOLEAN
);
CREATE TABLE users (  
  id serial NOT NULL PRIMARY KEY, 
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address VARCHAR(255),
  email VARCHAR(100),
  phone VARCHAR(10),
  avatar_url VARCHAR(255)
);
CREATE TABLE reservations (  
  id serial NOT NULL PRIMARY KEY,
  court_id INTEGER REFERENCES courts(id), 
  user_id INTEGER NOT NULL REFERENCES users(id),  
  res_date DATE,
  res_time TIME,
  seek_match BOOLEAN,
  players INTEGER 
);
