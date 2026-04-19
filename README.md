Project Architecture

This project is split into two parts:

Frontend (this repository – public)
Backend (private – hosted on AWS)
Frontend (This Repository)

This repository contains the frontend application. It is responsible for the user interface and all client-side functionality.

Built With
(Your frontend framework, e.g. React / Next.js)
JavaScript (ES6+)
Responsibilities

The frontend handles:

Uploading PDF files
User interface and page navigation
Displaying conversion results
Showing conversion history
Authentication flow (login and registration UI)
Sending requests to the backend API
API Communication

The frontend communicates with the backend through a REST API.

The API base URL is configured through environment variables:

API_BASE_URL=https://your-api-url.com
Backend (Private – AWS Hosted)

The backend is not part of this repository. It is a separate service deployed on AWS.

Tech Stack
Node.js
Express.js
AWS (cloud infrastructure)
AWS S3 (file storage)
Custom PDF conversion engine
Responsibilities

The backend handles:

File uploads and processing
PDF conversion logic
Authentication using JWT
File storage and retrieval using AWS S3
API endpoints used by the frontend
Backend Access

The backend repository is private.

For access or questions about the API, contact:

contact@pdfconverter.tech
