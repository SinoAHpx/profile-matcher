# Teams API

This document provides a detailed description of the Teams API endpoints.

## Get Events by Popularity

- **Endpoint:** `GET /teams/events`
- **Description:** Retrieves a list of active events, sorted by the number of participants in descending order.
- **Responses:**
  - `200 OK`: Returns a list of events.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Join Event

- **Endpoint:** `POST /teams/events/{event_id}/join`
- **Description:** Allows a user to join a large-scale event.
- **Path Parameters:**
  - `event_id` (string, required): The ID of the event to join.
- **Authentication:** Bearer Token required (for `user_email`).
- **Responses:**
  - `200 OK`: Returns a success message.
  - `400 Bad Request`: If the user has already joined the event.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Create Team

- **Endpoint:** `POST /teams/create`
- **Description:** Creates a new team for an event.
- **Authentication:** Bearer Token required (for `user_email`).
- **Request Body:**
  - `event_id` (string, required): The ID of the event.
  - `name` (string, required): The name of the team.
  - `say_something` (string, optional): A short message for the team.
- **Responses:**
  - `200 OK`: Returns the created team's information.
  - `400 Bad Request`: If the user has not joined the event or is already in a team.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Join Team

- **Endpoint:** `POST /teams/join/{team_id}`
- **Description:** Allows a user to join an existing team.
- **Path Parameters:**
  - `team_id` (string, required): The ID of the team to join.
- **Authentication:** Bearer Token required (for `user_email`).
- **Responses:**
  - `200 OK`: Returns a success message.
  - `400 Bad Request`: If the user has not joined the event or is already in the team.
  - `404 Not Found`: If the team is not found.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Leave Team

- **Endpoint:** `POST /teams/leave`
- **Description:** Allows a user to leave their current team.
- **Authentication:** Bearer Token required (for `user_email`).
- **Responses:**
  - `200 OK`: Returns a success message.
  - `400 Bad Request`: If the user is not in any team.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Set Team Member Skills

- **Endpoint:** `POST /teams/skills`
- **Description:** Sets the skills for a user within their team.
- **Authentication:** Bearer Token required (for `user_email`).
- **Request Body:**
  - `skill_ids` (array of integers, required): A list of skill IDs (maximum of 2).
- **Responses:**
  - `200 OK`: Returns a success message.
  - `400 Bad Request`: If the user is not in any team.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Get Team Members

- **Endpoint:** `GET /teams/members`
- **Description:** Retrieves information about the members of the user's current team.
- **Authentication:** Bearer Token required (for `user_email`).
- **Responses:**
  - `200 OK`: Returns the team ID, team name, and a list of members with their details.
  - `400 Bad Request`: If the user is not in any team.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Create Team Post

- **Endpoint:** `POST /teams/posts`
- **Description:** Creates a new post for the user's team.
- **Authentication:** Bearer Token required (for `user_email`).
- **Request Body:**
  - `title` (string, required): The title of the post.
  - `content` (string, required): The content of the post.
- **Responses:**
  - `200 OK`: Returns the created post.
  - `400 Bad Request`: If the user is not in any team.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Get All Team Posts

- **Endpoint:** `GET /teams/posts`
- **Description:** Retrieves all active team posts, sorted by creation date.
- **Responses:**
  - `200 OK`: Returns a list of team posts.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Get All Users

- **Endpoint:** `GET /teams/users`
- **Description:** Retrieves a list of all user profiles.
- **Responses:**
  - `200 OK`: Returns a list of user profiles.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Get User Recommendations

- **Endpoint:** `GET /teams/recommendations`
- **Description:** Retrieves team recommendations for the current user.
- **Authentication:** Bearer Token required (for `user_email`).
- **Responses:**
  - `200 OK`: Returns a list of team recommendations.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Update Recommendation Status

- **Endpoint:** `PATCH /teams/recommendations/{recommendation_id}`
- **Description:** Updates the status of a team recommendation (e.g., accepted or rejected).
- **Path Parameters:**
  - `recommendation_id` (string, required): The ID of the recommendation to update.
- **Authentication:** Bearer Token required (for `user_email`).
- **Request Body:**
  - `status` (string, required): The new status (`accepted` or `rejected`).
- **Responses:**
  - `200 OK`: Returns a success message.
  - `404 Not Found`: If the recommendation is not found.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Update Team Post

- **Endpoint:** `PATCH /teams/posts/{post_id}`
- **Description:** Updates a team post.
- **Path Parameters:**
  - `post_id` (string, required): The ID of the post to update.
- **Authentication:** Bearer Token required (for `user_email`).
- **Request Body:**
  - `title` (string, required): The updated title of the post.
  - `content` (string, required): The updated content of the post.
- **Responses:**
  - `200 OK`: Returns the updated post.
  - `404 Not Found`: If the post is not found or the user is not authorized to update it.
  - `500 Internal Server Error`: If an unexpected error occurs.

## Delete Team Post

- **Endpoint:** `DELETE /teams/posts/{post_id}`
- **Description:** Deletes a team post (soft delete).
- **Path Parameters:**
  - `post_id` (string, required): The ID of the post to delete.
- **Authentication:** Bearer Token required (for `user_email`).
- **Responses:**
  - `200 OK`: Returns a success message.
  - `404 Not Found`: If the post is not found or the user is not authorized to delete it.
  - `500 Internal Server Error`: If an unexpected error occurs.
