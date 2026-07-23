# Database Schema - JanMitra AI

## Overview
JanMitra AI uses Supabase (PostgreSQL) for user session logging, document storage, and vector embeddings for RAG retrieval.

## Tables
- `chat_sessions`: `session_id`, `created_at`, `user_id`, `language`
- `chat_messages`: `id`, `session_id`, `sender`, `message`, `agents_used`, `timestamp`
- `scheme_embeddings`: `id`, `scheme_name`, `content`, `embedding` (pgvector)
