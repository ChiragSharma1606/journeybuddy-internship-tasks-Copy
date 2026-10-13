# M11: Google Agent Development Kit (ADK)

## Objective
Describe the client-server lifecycle of an AI agent application using the Google Agent Development Kit (ADK), including request handling, agent execution, tool interactions, and response delivery.

## 1. Architecture Overview

The client sends a user message to the backend. The backend uses the ADK Runner to execute the configured agent, manages the session, and returns the agent's response to the client.

**Main components:**
- **Client:** Accepts user input and displays the response.
- **Backend server:** Receives requests and coordinates agent execution.
- **ADK Runner:** Runs the agent within a session.
- **Agent:** Processes the user's request and decides whether tools are needed.
- **Tools:** Perform supported actions or retrieve information.
- **Session service:** Maintains conversation state.

## 2. Client-Server Lifecycle

1. **User input:** The client collects a message from the user.
2. **Request transmission:** The client sends the message to the backend over HTTP or another supported transport.
3. **Request validation:** The backend validates the request and identifies the user and conversation session.
4. **Session management:** The backend creates or retrieves the appropriate ADK session.
5. **Agent execution:** The ADK Runner invokes the configured agent with the user's message.
6. **Tool interaction:** If necessary, the agent requests a tool call. The tool executes and returns its result to the agent.
7. **Response generation:** The agent processes the tool result and produces a response.
8. **Response delivery:** The backend sends the result or supported event stream to the client.
9. **UI update:** The client displays the response and updates its loading or error state.

## 3. Request-Response Flow

```text
User
  |
  v
Client Application
  |
  v
Backend API
  |
  v
ADK Runner
  |
  v
Agent and Session
  |
  +----> Tool Execution (if required)
  |              |
  |<-------------+
  v
Agent Response
  |
  v
Backend API
  |
  v
Client Displays Result
```

## 4. Session and State Management

- A session groups related interactions within a conversation.
- The backend should associate each session with the correct user.
- Session services can maintain conversation history and relevant state.
- Authentication and authorization should be checked before allowing access to a session.
- Sensitive information should not be exposed in logs or responses.

## 5. Error Handling

- **400 Bad Request:** The incoming request is invalid.
- **401 Unauthorized:** Authentication is missing or invalid.
- **403 Forbidden:** The user is not allowed to access the requested resource.
- **500 Internal Server Error:** An unexpected backend or agent execution error occurs.

The client should show a useful error message, while the server records appropriate diagnostic details without exposing secrets.

## 6. Security and Best Practices

- Authenticate users before processing protected requests.
- Validate user input on the server.
- Apply authorization checks to agent tools and session access.
- Limit tool permissions to the minimum required.
- Handle tool failures and timeouts gracefully.
- Avoid exposing API keys, credentials, and internal stack traces.
- Log errors without recording unnecessary sensitive user data.

## 7. Technical References

- Google ADK Documentation: https://google.github.io/adk-docs/
- Google ADK Python Quickstart: https://google.github.io/adk-docs/get-started/quickstart/
- Google ADK Sessions: https://google.github.io/adk-docs/sessions/

## Conclusion

The Google ADK client-server lifecycle connects user requests with agent execution, session management, optional tool interactions, and response delivery. Proper validation, access control, and error handling help make the application reliable and secure.
