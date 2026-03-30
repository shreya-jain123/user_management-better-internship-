# AI Prompting Rules for User Management Project

This document describes the rules used when prompting AI tools for code generation.

## 1. General Rules
- Always request **clean, readable code** (avoid overly complex solutions)
- Ask for **React functional components** with hooks
- Use **axios** for HTTP requests
- Use **SQLAlchemy** for ORM in Flask

## 2. Safety & Correctness
- AI must generate **error handling** for API requests
- Backend endpoints must follow **RESTful standards**
- Validate inputs in frontend and backend
- AI output should not contain unsafe operations (like arbitrary `eval`)

## 3. Iterative Prompting
- Break tasks into small requests (e.g., "Create user list component", "Add delete API call")
- Review each output manually before integrating
- Merge suggestions only after testing locally
