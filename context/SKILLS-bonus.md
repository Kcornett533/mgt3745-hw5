# Team Skills & Playbooks

## Skill: Deploying Express.js Web Gateways to Google Cloud Run

### Overview
A quick-start workflow for containerizing and deploying a lightweight Express.js Node.js server to Google Cloud Run without explicit Dockerfile writing.

### Execution Steps
1. **Prepare Express Server (`index.js`):** Ensure the application listens on `process.env.PORT || 8080` and host `0.0.0.0`.
2. **Deploy via Source:**
   ```bash
   gcloud run deploy <service-name> \
     --source . \
     --region us-central1 \
     --allow-unauthenticated
