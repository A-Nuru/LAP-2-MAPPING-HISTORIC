DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS user_account;


-- DROP TABLE IF EXISTS restaurant_locations;

DROP TABLE IF EXISTS points;


CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
);

CREATE TABLE points (
  points_id SERIAL PRIMARY KEY,
  description TEXT,
  icon TEXT,
  geom GEOMETRY(Point, 4326)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);


CREATE TABLE favourites (
  fav_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_account("user_id"),
  points_id INT NOT NULL,
  FOREIGN KEY (points_id) REFERENCES points("points_id")
);
-- CREATE TABLE restaurant_locations (
--   id SERIAL PRIMARY KEY,
--   name TEXT,
--   address TEXT,
--   city TEXT,
--   state TEXT,
--   zip TEXT,
--   geom GEOMETRY(Point, 4326)
-- );

-- INSERT INTO restaurant_locations (name, address, city, state, zip, geom)
-- VALUES (
--   'Example Restaurant',
--   '123 Main St',
--   'San Francisco',
--   'CA',
--   '94105',
--   ST_SetSRID(ST_MakePoint(-122.4090, 37.7837), 4326)
-- );

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  description TEXT,
  icon TEXT,
  geom GEOMETRY(Point, 4326)

);

INSERT INTO points (description, icon, geom)
VALUES (

  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
  'theatre',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.038659, 38.931567]}'))
),
(
  '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
  'theatre',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.003168, 38.894651]}'))
),
(
  '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
  'bar',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.090372, 38.881189]}'))
)
;

INSERT INTO favourites(user_id, points_id)
VALUES (1, 3);

  'Make it Mount Pleasant',
  'theatre-15',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.038659, 38.931567]}'))
);


