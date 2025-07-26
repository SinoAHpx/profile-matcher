# Interests API

This document provides a detailed description of the Interests API endpoints.

## Get All Interests

- **Endpoint:** `GET /interests`
- **Description:** Retrieves a list of all available interests (hobbies) in the system.
- **Responses:**
  - `200 OK`: Returns a list of interests, where each interest has an `id` and `name`.
  - `400 Bad Request`: If there is an error while fetching the interests.

## Update User Interests

- **Endpoint:** `PUT /users/{user_id}/interests`
- **Description:** Updates the interests for a specific user.
- **Path Parameters:**
  - `user_id` (string, required): The ID of the user whose interests are to be updated.
- **Authentication:** Bearer Token required.
- **Request Body:**
  - `interest_ids` (array of strings, required): A list of interest IDs to be assigned to the user.
- **Responses:**
  - `200 OK`: Returns the updated list of interest IDs for the user.
  - `400 Bad Request`: If the interest IDs are in an invalid format or do not exist.
  - `403 Forbidden`: If the current user tries to update another user's interests.
  - `404 Not Found`: If the user's profile is not found.
