# Firebase Authentication Lifecycle

## Objective
Document a secure user onboarding and authentication lifecycle using Firebase Authentication.

## Authentication Flow

```text
User
  |
  v
Sign Up / Login
  |
  v
Firebase Authentication
  |
  v
Identity Token Issued
  |
  v
Client Sends Token to Backend
  |
  v
Backend Verifies Token
  |
  +---- Invalid Token ----> HTTP 401 Unauthorized
  |
  v
Check User Permissions
  |
  +---- Insufficient Access ----> HTTP 403 Forbidden
  |
  v
Access Protected Resource
```

## Lifecycle Steps

1. **User Registration:** The user creates an account using a supported sign-in method.
2. **Authentication:** Firebase verifies the user's credentials.
3. **Token Issuance:** Firebase issues an identity token after successful authentication.
4. **Token Transmission:** The client sends the token to a protected backend endpoint over HTTPS.
5. **Token Verification:** The backend verifies the token using the Firebase Admin SDK.
6. **Authorization:** The backend checks whether the authenticated user has permission to access the resource.
7. **Response:** Authorized requests proceed; unauthorized requests are rejected.

## Security Considerations

- Never store user passwords in application code or repositories.
- Verify tokens on the backend, not only on the client.
- Use HTTPS for network communication.
- Apply least-privilege access controls.
- Never commit service-account credentials or secret keys to GitHub.

## Error Responses

- **401 Unauthorized:** Missing, invalid, or expired authentication token.
- **403 Forbidden:** Authenticated user lacks permission to access the resource.

## Official Documentation

https://firebase.google.com/docs/auth
