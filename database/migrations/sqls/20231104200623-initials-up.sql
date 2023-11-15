/* Replace with your SQL commands */

CREATE TABLE Users
(
  id INT GENERATED ALWAYS AS IDENTITY,
  fullname VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(40),
  userRole VARCHAR(40),
  phoneVerified boolean,
  emailVerified boolean,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE authOTP(
  id INT GENERATED ALWAYS AS IDENTITY,
  phone VARCHAR(40),
  otp INT,
  expiry VARCHAR(255)
  verified boolean,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP,
  verifiedAt TIMESTAMP,
);

CREATE TABLE authToken(
   id INT GENERATED ALWAYS AS IDENTITY,
   user_id INT,
   refreshToken VARCHAR(255),
   createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
   updatedAt TIMESTAMP,
   PRIMARY KEY(id),
   CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);