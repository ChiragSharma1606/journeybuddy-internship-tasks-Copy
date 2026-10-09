# Redis Cache-Aside Architecture

## Objective
Design a cache-aside data retrieval strategy using Redis with a strict Time-to-Live (TTL) expiration policy.

## 1. Cache-Aside Workflow

```text
        Client Request
              |
              v
        Check Redis Cache
              |
        +-----+-----+
        |           |
      HIT           MISS
        |           |
        v           v
 Return Cached   Query Database
     Data            |
                     v
                 Store in Redis
                     |
                     v
                 Return Data
```

## 2. Workflow Explanation

1. The application receives a request for a resource.
2. It checks Redis for the corresponding cache key.
3. **Cache hit:** Return the cached value immediately.
4. **Cache miss:** Query the persistent database.
5. Store the retrieved result in Redis with a TTL.
6. Return the result to the client.

## 3. Key Design

| Key Pattern | Stored Value | TTL |
|---|---|---|
| `user:123` | User profile | 300 seconds |
| `dashboard:summary` | Dashboard summary | 60 seconds |
| `entity:456` | Entity details | 600 seconds |

These TTL values are illustrative and should be adjusted according to data freshness requirements.

## 4. TTL Expiration Policy

TTL determines how long a cache entry remains available before Redis expires it.

- Use shorter TTLs for frequently changing data.
- Use longer TTLs for relatively stable data.
- Set expiration when writing cache entries.
- Handle expired or missing entries as cache misses.
- Invalidate affected cache entries after important database updates when necessary.

## 5. Error Handling

- If Redis is unavailable, the application may fall back to the database when safe to do so.
- Handle database failures without returning fabricated data.
- Prevent cache stampedes by controlling simultaneous requests for the same missing key.
- Avoid caching sensitive data unless appropriate access controls are in place.

## 6. Example Redis Commands

```redis
SET user:123 "sample-user-data" EX 300
GET user:123
TTL user:123
```

`EX 300` sets the key to expire after 300 seconds.

## Official Documentation

https://redis.io/docs/
