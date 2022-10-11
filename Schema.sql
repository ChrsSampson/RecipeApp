-- MYSQL SCHEMA

DROP DATABASE IF EXISTS recipes;

CREATE DATABASE recipes;

USE recipes;

CREATE TABLE users(
  userId INTEGER NOT NULL AUTO_INCREMENT,
  username TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  password TEXT NOT NULL,
  session TEXT,
  PRIMARY KEY(userId)
);

CREATE TABLE reciepes(
  recipeId INTEGER NOT NULL AUTO_INCREMENT,
  apiId INTEGER NOT NULL,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  category TEXT NOT NULL,
  area TEXT NOT NULL,
  source TEXT,
  tags TEXT,
  ingredients TEXT,
  image TEXT,
  PRIMARY KEY(recipeId),
  UNIQUE KEY(apiId, recipeId)
);

CREATE TABLE famlies(
  familyId INTEGER NOT NULL AUTO_INCREMENT,
  owner INTEGER NOT NULL,
  familyName TEXT NOT NULL,
  PRIMARY KEY(familyId),
  FOREIGN KEY(owner) REFERENCES users(userId)
);

CREATE TABLE likes(
  userId INTEGER NOT NULL,
  recipeId INTEGER NOT NULL
);
