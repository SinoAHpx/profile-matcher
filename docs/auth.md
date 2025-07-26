# Authentication API

This document provides a detailed description of the Authentication API endpoints.

## Register User

- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user with their nickname, email, password, and an optional avatar.
- **Request Body:**
  - `nickname` (string, required): The user's nickname.
  - `email` (string, required): The user's email address.
  - `password` (string, required): The user's password (must be at least 6 characters).
  - `avatar` (file, optional): An image file for the user's avatar.
- **Responses:**
  - `200 OK`: Returns a success message, user ID, and the created user profile.
  - `400 Bad Request`: If the nickname is empty, the password is less than 6 characters, or user creation fails.
  - `500 Internal Server Error`: If an unexpected error occurs during registration.

## Upload Avatar by Email

- **Endpoint:** `POST /auth/upload-avatar`
- **Description:** Uploads an avatar for a user identified by their email.
- **Request Body:**
  - `email` (string, required): The user's email address.
  - `avatar` (file, required): The avatar image file.
- **Responses:**
  - `200 OK`: Returns a success message, email, user ID, and the avatar URL.
  - `404 Not Found`: If no user is found with the provided email.
  - `500 Internal Server Error`: If the avatar upload fails.

## Get User ID by Email

- **Endpoint:** `GET /auth/user-id/{email}`
- **Description:** Retrieves the user ID for a given email address.
- **Path Parameters:**
  - `email` (string, required): The user's email address.
- **Responses:**
  - `200 OK`: Returns the email and user ID.
  - `404 Not Found`: If no user is found with the provided email.
  - `500 Internal Server Error`: If the request fails.

## Get Avatar by Email

- **Endpoint:** `GET /auth/avatar/{email}`
- **Description:** Retrieves the avatar URL for a user by their email.
- **Path Parameters:**
  - `email` (string, required): The user's email address.
- **Responses:**
  - `200 OK`: Returns the email, user ID, and avatar URL.
  - `404 Not Found`: If the user or user profile is not found.
  - `500 Internal Server Error`: If the request fails.

## Login

- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns an access token.
- **Request Body:**
  - `email` (string, required): The user's email address.
  - `password` (string, required): The user's password.
- **Responses:**
  - `200 OK`: Returns the access token, token type, and user information.
  - `401 Unauthorized`: If the credentials are invalid.

## Get User Profile

- **Endpoint:** `GET /auth/profile`
- **Description:** Retrieves the profile of the currently authenticated user.
- **Authentication:** Bearer Token required.
- **Responses:**
  - `200 OK`: Returns the user's profile.
  - `404 Not Found`: If the user's profile is not found.
  - `400 Bad Request`: If the request fails.

## Update User Profile

- **Endpoint:** `PUT /auth/profile`
- **Description:** Updates the profile of the currently authenticated user.
- **Authentication:** Bearer Token required.
- **Request Body:**
  - `mbti` (string, optional): The user's MBTI type.
  - `hobbies` (array of integers, optional): A list of hobby IDs.
  - `motto` (string, optional): The user's motto.
  - `self_description` (string, optional): A description of the user.
- **Responses:**
  - `200 OK`: Returns a success message and the updated profile.
  - `400 Bad Request`: If no data is provided for the update.
  - `404 Not Found`: If the user's profile is not found.

## Get Hobbies

- **Endpoint:** `GET /auth/hobbies`
- **Description:** Retrieves a list of all available hobbies.
- **Responses:**
  - `200 OK`: Returns a list of hobbies.
  - `400 Bad Request`: If the request fails.

## Get Hobbies by Category

- **Endpoint:** `GET /auth/hobbies/{category}`
- **Description:** Retrieves a list of hobbies filtered by category.
- **Path Parameters:**
  - `category` (string, required): The category of hobbies to retrieve (e.g., "body", "mind", "heart", "hands").
- **Responses:**
  - `200 OK`: Returns a list of hobbies in the specified category.
  - `400 Bad Request`: If the category is invalid.

## Test Supabase Connection

- **Endpoint:** `GET /auth/test-connection`
- **Description:** Tests the connection to the Supabase authentication service.
- **Responses:**
  - `200 OK`: Returns a success message if the connection is working.
  - `200 OK` with error status: Returns an error message if the connection fails.

## Simplified Register

- **Endpoint:** `POST /auth/register-simple`
- **Description:** A simplified user registration endpoint using admin privileges.
- **Request Body:**
  - `nickname` (string, required): The user's nickname.
  - `email` (string, required): The user's email address.
  - `password` (string, required): The user's password (must be at least 6 characters).
- **Responses:**
  - `200 OK`: Returns a success message, user ID, and the created user profile.
  - `400 Bad Request`: If the nickname is empty, the password is less than 6 characters, or user creation fails.
  - `500 Internal Server Error`: If an unexpected error occurs during registration.
