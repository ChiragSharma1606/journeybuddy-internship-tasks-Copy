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

## 6. Example IAM Access Policy

The following is a conceptual permission plan, not a deployable IAM policy.

| Principal | Resource | Access |
|---|---|---|
| Public visitor | Public assets bucket | Read objects only if public access is intentionally enabled |
| Authenticated application user | Private files bucket | Access only to files authorized by the application |
| Application service account | Public assets bucket | Only the permissions required by the application |
| Application service account | Private files bucket | Minimum required read/write permissions |
| Cloud administrator | Both buckets | Administrative access according to organizational policy |

### Access Control Workflow

1. Authenticate the user.
2. Check whether the user is authorized to access the requested file.
3. Allow access only when the authorization check succeeds.
4. Deny unauthorized requests.
5. Record relevant access events for auditing.

### Security Notes

- Do not grant public access to the private files bucket.
- Use least-privilege IAM roles.
- For temporary private-file access, consider short-lived signed URLs.
- Review bucket permissions regularly.


## Official Documentation

https://cloud.google.com/docs
