# MongoDB Atlas Vector Search

## Objective
Design a document schema that stores metadata alongside vector embeddings and define an approximate nearest neighbor (ANN) index.

## Collection Schema

Example document in the `knowledge_chunks` collection:

```json
{
  "_id": "chunk_001",
  "text": "Next.js supports server and client components.",
  "author": "Engineering Team",
  "category": "web-development",
  "timestamp": "2026-10-09T10:00:00Z",
  "embedding": [0.12, -0.34, 0.56, 0.78]
}
```

**Note:** The embedding values above are illustrative only. A production embedding must have the dimension required by the selected embedding model and vector index.

## Field Description

| Field | Purpose |
|---|---|
| `_id` | Unique document identifier |
| `text` | Original knowledge chunk |
| `author` | Content author or source |
| `category` | Used for metadata filtering |
| `timestamp` | Content creation or update time |
| `embedding` | Numeric vector representing semantic meaning |

## Vector Index Design

- **Index name:** `knowledge_vector_index`
- **Collection:** `knowledge_chunks`
- **Vector field:** `embedding`
- **Similarity metric:** Cosine
- **Index type:** Approximate nearest neighbor (ANN)

The vector dimensions must match the embedding model used to generate the vectors.

## Retrieval Workflow

1. Split source documents into manageable text chunks.
2. Generate an embedding for each chunk.
3. Store the text, metadata, and embedding in MongoDB.
4. Generate an embedding for the user's query.
5. Run vector search and apply relevant metadata filters.
6. Return the most semantically relevant chunks.

## Benefits

- Combines semantic similarity with metadata filtering.
- Stores operational data and embeddings together.
-  Supports retrieval for retrieval-augmented generation (RAG) systems.

## Example Vector Search Index Configuration

The following JSON defines a vector index for the `embedding` field. The example uses 4 dimensions to match the illustrative embedding in the sample document. A real project must use the dimension supported by its chosen embedding model.

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 4,
      "similarity": "cosine"
    },
    {
      "type": "filter",
      "path": "category"
    }
  ]
}
```

**Important:** This is an illustrative configuration. Before deployment, configure the vector dimensions to match the actual embedding model and use the supported settings for the selected Atlas Vector Search version.

## Example Query Workflow

1. Convert the user's query into an embedding using the same embedding model.
2. Search the `knowledge_chunks` collection using the `knowledge_vector_index`.
3. Apply a category filter when required.
4. Rank matching chunks by vector similarity.
5. Return the most relevant text chunks to the application.



## Official Documentation

https://www.mongodb.com/docs/atlas/atlas-vector-search/
