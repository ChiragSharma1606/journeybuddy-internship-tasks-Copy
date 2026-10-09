# Pinecone Vector Database

## Objective
Group sample sentences into semantic clusters and explain how cosine similarity ranks their relevance to a user query.

## 1. Sample Sentences and Semantic Clusters

| ID | Sentence | Cluster |
|---|---|---|
| S1 | I enjoy running every morning. | Fitness |
| S2 | Regular exercise improves physical health. | Fitness |
| S3 | Python is used to build software applications. | Programming |
| S4 | Java is a popular programming language. | Programming |
| S5 | I go jogging before breakfast. | Fitness |

Sentences S1, S2, and S5 belong to the fitness cluster. Sentences S3 and S4 belong to the programming cluster.

## 2. User Query

**Query:** "What are the benefits of regular exercise?"

A text embedding model converts the query and sample sentences into numerical vectors. Pinecone can then retrieve vectors with high semantic similarity to the query.

## 3. Cosine Similarity

Cosine similarity measures the angle between two non-zero vectors:

```text
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Here:
- `A · B` is the dot product of the vectors.
- `||A||` and `||B||` are their magnitudes.
- A higher score indicates greater directional similarity.

## 4. Expected Relevance Ranking

For the example query, the expected qualitative ranking is:

| Rank | Sentence | Reason |
|---|---|---|
| 1 | S2 | Directly discusses exercise and health |
| 2 | S1 | Discusses regular physical activity |
| 3 | S5 | Describes jogging, a form of exercise |
| 4 | S3 | Unrelated programming topic |
| 5 | S4 | Unrelated programming topic |

**Note:** This is an illustrative ranking based on meaning, not measured Pinecone output. Actual rankings and similarity scores depend on the embedding model and generated vectors.

## 5. Vector Index Workflow

1. Convert each sentence into an embedding.
2. Assign each vector a unique ID.
3. Store vectors and relevant metadata in a Pinecone index.
4. Convert the user's query into an embedding using the same compatible model.
5. Query the index using the selected similarity metric.
6. Retrieve the most relevant matches and their metadata.

## 6. Index Design

- **Index:** `journeybuddy-knowledge`
- **Metric:** Cosine
- **Vector dimensions:** Must match the selected embedding model.
- **Metadata:** Sentence ID, text, and semantic cluster.
- **Retrieval:** Top-k similarity search.

Pinecone manages the underlying vector indexing and retrieval infrastructure; the exact internal indexing algorithm depends on the service implementation.

## Official Documentation

https://docs.pinecone.io/
