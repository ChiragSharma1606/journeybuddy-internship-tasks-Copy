# M11: Google ADK — Mobile Client Architecture

## Objective
Design the client-server interaction lifecycle for a mobile application, covering UI event capture, asynchronous network requests, state updates, and view re-rendering.

## 1. Architecture Overview

A mobile application captures user actions, sends requests asynchronously to a backend server, processes the returned data, updates its application state, and re-renders the user interface.

**Main components:**
- **User Interface (UI):** Displays information and accepts user input.
- **Event Handler:** Captures button clicks, form submissions, and other user actions.
- **Network Layer:** Sends asynchronous HTTP requests to the server.
- **Backend Server:** Processes requests and returns responses.
- **State Manager:** Stores the current application data and request status.
- **UI Renderer:** Updates the screen when application state changes.

## 2. Client-Server Interaction Lifecycle

1. **UI event capture:** The user clicks a button or submits a form.
2. **Input validation:** The application checks the input before sending the request.
3. **Asynchronous network dispatch:** The client sends a request without blocking the UI thread.
4. **Loading state:** The application displays a loading indicator while waiting for the response.
5. **Server processing:** The backend processes the request and returns a response.
6. **Response handling:** The client receives the response and checks for success or failure.
7. **State updating:** The application updates its data, loading status, or error message.
8. **View re-rendering:** The UI reflects the updated state and displays the result.

## 3. Client-Server State Diagram

```text
       User Action
            |
            v
      Capture UI Event
            |
            v
      Validate Input
            |
            v
   Set Loading State
            |
            v
  Dispatch Async Request
            |
            v
     Backend Server
            |
            v
     Receive Response
            |
            v
      Request Success?
         /       \
       Yes        No
        |          |
        v          v
   Update Data  Update Error
        |          |
        +----+-----+
             |
             v
      Update App State
             |
             v
       Re-render UI
             |
             v
       Show Final View
```

## 4. Asynchronous Network Handling

- Use asynchronous requests so the UI remains responsive.
- Display a loading indicator while waiting for a response.
- Handle successful responses and update the application data.
- Handle network errors, timeouts, and unsuccessful HTTP status codes.
- Prevent duplicate submissions when necessary.
- Cancel or ignore outdated requests when the user changes screens or submits a newer request.

## 5. State Management

The application should maintain the following states:

| State | Purpose |
|---|---|
| Idle | Waiting for user interaction |
| Loading | Request is in progress |
| Success | Response received successfully |
| Error | Request failed or returned an error |

Whenever the state changes, the relevant UI components should update to display the correct information.

## 6. Error Handling and Best Practices

- Validate user input before dispatching requests.
- Keep network operations asynchronous.
- Handle offline conditions and server errors gracefully.
- Display clear error messages and allow retrying when appropriate.
- Avoid updating the UI with stale responses.
- Keep API credentials and sensitive information secure.
- Separate UI components, network logic, and state management.

## 7. Technical Reference

- Assignment reference: https://adk.dev/

## Conclusion

A well-designed mobile client-server lifecycle captures user events, dispatches asynchronous requests, processes responses, updates application state, and re-renders the UI. Proper state management and error handling improve responsiveness and reliability.
