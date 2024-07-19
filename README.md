# Instatus Activity Log

A lightweight service for monitoring your users activities

## Getting Started

Make sure you are using Node@20 or higher

- 1. Clone the repo

- 2. Open your terminal and make sure you are in the project root directory.

- 3. Run the following command:

  ```bash
  npm i
  npm run dev
  ```

> Now you can access the project on [http://localhost:3000 🚀](http://localhost:3000)

## Add events

Use the following route to add new event

```bash
  http://localhost:3000/events
```

Method: POST

example body:

```JSON
{
    "object": "event",
    "actorId": "user_TEST1234",
    "actorName": "Test Test",
    "group": "test.com",
    "action": {
        "object": "event",
        "name": "abcd"
    },
    "targetId": "user_test",
    "targetName": "test@test.com",
    "location": "123.45.67.89",
    "metadata": {}
}
```