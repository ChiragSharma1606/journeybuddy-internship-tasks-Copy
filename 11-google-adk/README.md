# Google ADK — Client-Server Interaction Lifecycle

## 1. Objective
Design the interaction lifecycle between a client application and a backend server, including UI events, asynchronous network requests, state updates, and UI rendering.

## 2. Architecture

```text
User Interaction
       |
       v
UI Event Capture
       |
       v
Async Network Request
       |
       v
Backend Processing
       |
       v
Response Received
       |
       v
Application State Update
       |
       v
UI Re-render
```

## 3. Lifecycle Components

1. **UI Event Capture:** Detect actions such as button clicks or form submissions.
2. **Async Network Request:** Send the request without blocking the user interface.
3. **Backend Processing:** Validate the request and perform the required operation.
4. **Response Handling:** Process the server response or handle an error.
5. **State Update:** Update the application's data based on the response.
6. **UI Re-render:** Display the updated information to the user.

## 4. Example Interaction

Consider a user submitting a question to an intelligent assistant.

- The user enters a question and clicks Send.
- The client captures the event and sends an asynchronous request.
- The server processes the question and generates a response.
- The client receives the response and updates its state.
- The interface displays the answer.

## 5. Error Handling

- Display a loading indicator while waiting for the response.
- Handle network failures and server errors.
- Prevent accidental duplicate submissions when appropriate.
- Show a clear error message and allow the user to retry.
- Handle delayed responses without freezing the UI.

## 6. Key Design Considerations

- Keep the user interface responsive.
- Separate UI state from network-request logic.
- Validate data on both client and server.
- Handle asynchronous operations safely.
- Avoid exposing sensitive information in client-side code.

## 7. Reference Documentation

https://adk.dev/

## 8. Example Client Request Lifecycle

The following pseudocode demonstrates the client-side flow when a user submits a question to the assistant.

```javascript
async function sendQuestion(question) {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    setAnswer(data.answer);
  } catch (error) {
    setError("Unable to get a response. Please try again.");
  } finally {
    setLoading(false);
  }
}
```

**Note:** This is conceptual client-side pseudocode. Functions such as `setLoading`, `setError`, and `setAnswer` represent application state updates and must be implemented in the actual UI framework.

### Expected UI States

| State | UI behavior |
|---|---|
| Loading | Show a progress indicator |
| Success | Display the assistant's answer |
| Error | Display an error message and allow retry |
| Complete | Stop the loading indicator |

