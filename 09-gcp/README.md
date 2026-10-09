# Google Cloud Platform Storage Architecture

## Objective
Design a Google Cloud Storage architecture that separates public assets from private, authenticated files using Identity and Access Management (IAM).

## 1. Storage Architecture

```text
                Application
                     |
                     v
            Authentication Layer
                     |
                     v
             Authorization Check
                     |
              +------+------+
              |             |
              v             v
        Public Assets   Private Files
              |             |
              v             v
       Public Bucket    Private Bucket
              |             |
              v             v
       Public Read     Authorized Access
```

## 2. Bucket Design

| Bucket | Content | Access Policy |
|---|---|---|
| `journeybuddy-public-assets` | Public images and static assets | Public read only when explicitly intended |
| `journeybuddy-private-files` | User documents and confidential files | Private by default; access controlled through IAM |

These are illustrative bucket names. Actual Google Cloud bucket names must be globally unique.

## 3. IAM Permission Matrix

| Role | Public Assets | Private Files |
|---|---|---|
| Public visitor | Read, if public access is explicitly enabled | No access |
| Authenticated user | Read public assets | Access only to permitted files |
| Application service account | Required read/write permissions | Minimum permissions needed |
| Administrator | Managed administrative access | Managed administrative access |

## 4. Security Controls

- Keep private buckets private by default.
- Apply least-privilege IAM permissions.
- Use application authorization checks for user-specific files.
- Avoid embedding service-account keys in source code or GitHub.
- Enable appropriate logging and auditing.
- Use signed URLs when temporary access to private objects is needed.

## 5. Deployment Design

Google Cloud Run can host containerized application services, while Google Cloud Storage stores uploaded assets and files.

The application authenticates users, checks authorization, and only then permits access to private resources.

## Official Documentation

https://cloud.google.com/docs
