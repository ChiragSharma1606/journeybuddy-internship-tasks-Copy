# M3: FastAPI Schema Validation

## Objective
Design a FastAPI endpoint that validates incoming request data, handles invalid inputs, and returns structured JSON responses.

## 1. Endpoint Design

**Endpoint:** `GET /entities/{entity_id}`

**Query parameters:**
- `category`: Category of the entity.
- `limit`: Maximum number of records to return (1–100).

**Path parameter:**
- `entity_id`: A positive integer identifying the entity.

## 2. Validation Rules

| Parameter | Validation Rule | Error Response |
|---|---|---|
| `entity_id` | Must be a positive integer | HTTP 422 |
| `category` | Must belong to the allowed categories | HTTP 422 |
| `limit` | Must be between 1 and 100 | HTTP 422 |

FastAPI uses Pydantic models and type annotations to validate request data automatically.

## 3. Validation Flow

1. Receive the incoming HTTP request.
2. Extract path and query parameters.
3. Validate parameter types and constraints.
4. Return a structured validation error if the input is invalid.
5. Process the request if validation succeeds.
6. Return the response in JSON format.

## 4. Example Successful Response

```json
{
  "entity_id": 101,
  "category": "technology",
  "status": "success",
  "message": "Entity retrieved successfully"
}
```

## 5. Example Validation Error

For an invalid `entity_id`, FastAPI returns HTTP 422 Unprocessable Entity.

```json
{
  "detail": [
    {
      "loc": ["path", "entity_id"],
      "msg": "Input should be a valid integer",
      "type": "int_parsing"
    }
  ]
}
```

The exact error message may vary depending on the invalid input and FastAPI/Pydantic version.

## 6. Error Handling

- **422 Unprocessable Entity:** Request parameters fail validation.
- **404 Not Found:** The requested entity does not exist.
- **500 Internal Server Error:** An unexpected server-side error occurs.

Error responses should provide useful information without exposing internal stack traces or sensitive implementation details.

## 7. Security and Best Practices

- Validate all incoming request parameters.
- Use type annotations and Pydantic validation.
- Define clear request and response schemas.
- Return appropriate HTTP status codes.
- Keep sensitive information out of error responses.
- Document endpoint behavior and validation rules.

## 8. Technical References

- FastAPI Documentation: https://fastapi.tiangolo.com/
- Request Parameters: https://fastapi.tiangolo.com/tutorial/query-params/
- Path Parameters: https://fastapi.tiangolo.com/tutorial/path-params/
- Pydantic Documentation: https://docs.pydantic.dev/latest/

## Conclusion

FastAPI provides automatic request validation, structured error responses, and type-based data handling. These features help build reliable and maintainable API endpoints.
