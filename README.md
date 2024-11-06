# Backend Test Task

The goal is to create a lightweight web server that will function as a pub/sub microservice.

## Requirements

### Non-Technical Requirements
1. Clients should be able to **publish data** to a specific topic.
2. Clients should be able to **subscribe** to topics.
3. **All subscribers** of a topic should receive data published to that topic.

### Technical Requirements
1. **Data Format**: Data must be in JSON format.
2. **Large JSON Objects**: JSON objects will be large (100KB+).
3. **High Request Volume**: The server should handle approximately 1000 requests per second (RPS).
4. **Scalability**: The server must support horizontal scaling.

### Additional Notes
- **Minimize Dependencies**: Aim to reduce dependencies as much as possible for a lightweight and efficient implementation.

### Example API Requests

**Publishing Data to a Topic**:
```bash
curl -X POST 'https://example.com/topics/{topic}' \
-H 'Content-Type: application/json' \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello World"
}'

```

**Subscribing to a Topic**:
```bash
curl -N \
-H "Accept: text/event-stream" \
-H "Cache-Control: no-cache" \
'https://example.com/topics/{topic}'
```
