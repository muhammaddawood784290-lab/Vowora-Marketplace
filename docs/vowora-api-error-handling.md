# Vowora API Error Handling

## Error response shape

- `message`: human-readable explanation.
- `code`: machine-readable error code.
- `details`: optional structured context.
- `requestId`: correlation ID for support.

## HTTP status classes

| Status | Meaning |
| --- | --- |
| 400 | Bad request, validation failure. |
| 401 | Unauthenticated. |
| 403 | Unauthorized. |
| 404 | Resource not found. |
| 409 | Conflict, state transition not allowed. |
| 422 | Unprocessable entity, validation failure. |
| 429 | Rate limited. |
| 500 | Internal server error. |
| 503 | Service unavailable. |

## Security

- Do not expose stack traces to clients.
- Log full details server-side.
- Rate-limit error-generating endpoints.

## Status

- **Planned** — backend error handling is not yet implemented.
