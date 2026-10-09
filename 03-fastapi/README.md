# FastAPI Schema Validation

## Objective
Define strict validation rules for an API endpoint and document its error-handling flow.

## Example Endpoint

`GET /entities/{entity_id}?category=technology`

## Validation Rules

| Parameter | Type | Validation |
|---|---|---|
| entity_id | Integer | Must be a positive integer |
| category | String | Must be an allowed category |
| limit | Integer | Must be between 1 and 100 |

## Request Flow

```text id="j52jca"
Client Request
      |
      v
FastAPI Endpoint
      |
      v
Validate Path and Query Parameters
      |
      +---- Invalid ----> HTTP 422 Validation Error
      |
      v
Execute Endpoint Logic
      |
      v
Serialize Response as JSON
      |
      v
Return HTTP Response
```

## Error Handling

FastAPI uses request validation to reject malformed inputs before the endpoint logic executes. Validation errors are returned in a structured JSON response with details about the invalid fields.

- **422 Unprocessable Entity:** Invalid request parameters or data.
- **404 Not Found:** The requested entity does not exist.
- **500 Internal Server Error:** An unexpected server-side failure.

## Security and Reliability

- Validate all untrusted inputs.
- Use clear and consistent response schemas.
- Avoid exposing internal stack traces to clients.
- Document request and response models.

## Official Documentation

https://fastapi.tiangolo.com/
