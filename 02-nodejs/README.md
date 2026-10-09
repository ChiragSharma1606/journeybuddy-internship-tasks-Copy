# Node.js Middleware Architecture

## Objective
Design an HTTP request middleware pipeline using Node.js.

## Request Pipeline

```text
Client Request
      |
      v
Request Entry Timestamp
      |
      v
Inspect Request Headers
      |
      v
Validate and Normalize Input
      |
      v
Record Telemetry Metrics
      |
      v
Route Handler
      |
      v
HTTP Response
```

## Middleware Responsibilities

1. **Timestamp:** Record when the request enters the application.
2. **Header Inspection:** Check required headers, such as content type and authorization.
3. **Input Validation:** Validate and normalize incoming request data.
4. **Telemetry:** Record request counts, processing duration, status codes, and errors.
5. **Next Handler:** Forward valid requests to the next middleware or route handler.

## Error Handling

If a required header is missing or invalid, the middleware should return an appropriate HTTP error response. Unexpected errors should be passed to centralized error-handling middleware.

## Security Considerations

- Validate untrusted input.
- Avoid logging passwords, tokens, or other sensitive information.
- Use HTTPS in production.
- Apply authentication and authorization where required.

## Official Documentation

https://nodejs.org/en/docs/
## Example Telemetry Design

### Metrics to Capture

| Metric | Description |
|---|---|
| `request_start_time` | Timestamp recorded when the request enters the middleware |
| `method` | HTTP method, such as GET or POST |
| `route` | Requested API route |
| `status_code` | HTTP response status code |
| `duration_ms` | Total request processing time in milliseconds |

### Request Processing Logic

1. Record the request entry timestamp.
2. Inspect the request headers and validate required fields.
3. Start a timer to measure processing duration.
4. Forward valid requests to the next middleware or route handler.
5. Capture the response status and calculate the request duration.
6. Record the metrics using the application's telemetry system.

### Conceptual Pseudocode

```javascript
function telemetryMiddleware(req, res, next) {
  const startTime = Date.now();
  const requestStartTime = new Date().toISOString();

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    console.log({
      requestStartTime,
      method: req.method,
      route: req.path,
      statusCode: res.statusCode,
      durationMs
    });
  });

  next();
}
```

This is conceptual Express-style middleware. It records telemetry when the response finishes and forwards the request using `next()`. Production implementations should use structured logging and avoid recording sensitive headers or personal data.
