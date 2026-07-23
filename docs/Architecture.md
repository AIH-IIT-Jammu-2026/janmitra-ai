# JanMitra AI - Architecture Overview

## Multi-Agent Orchestration Flow

```
User Query
   │
   ▼
[ React Frontend ]
   │
   ▼ POST /api/chat
[ FastAPI Backend ]
   │
   ▼
[ Intent Router Agent ]
   │
   ├───────────────┼───────────────┼───────────────┐
   ▼               ▼               ▼               ▼
[Gov Schemes] [Education] [Agriculture] [Healthcare]
   │               │               │               │
   └───────────────┴───────┬───────┴───────────────┘
                           ▼
               [ Aggregator Agent ]
                           │
                           ▼
                  [ ChatResponse ]
```

## Core Components
- **Intent Router**: Classifies prompt intent and determines active domain agents.
- **Expert Agents**: Domain-specific prompts for Government Schemes, Education, Agriculture, and Health.
- **Response Aggregator**: Synthesizes agent answers into a unified response with action plans and sources.
