# Deploying the Contact Form Cloud Run Service

## Prerequisites

1. Google Cloud CLI installed: https://cloud.google.com/sdk/docs/install
2. A Google Cloud project (Project ID: `horizon-capture`)

## Step 1: Authenticate and Set Project

```bash
gcloud auth login
gcloud config set project horizon-capture
```

## Step 2: Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

## Step 3: Create Firestore Database

```bash
gcloud firestore databases create --location=us-east1
```

Or via Console:
1. Go to https://console.cloud.google.com/firestore
2. Select "Native mode"
3. Choose a location (us-east1 recommended)
4. Click "Create Database"

## Step 4: Grant Permissions to Cloud Run Service Account

```bash
gcloud projects add-iam-policy-binding horizon-capture \
  --member="serviceAccount:$(gcloud run services describe save-contact --region=us-east1 --format='value(spec.template.spec.serviceAccountName)')" \
  --role="roles/datastore.user"
```

## Step 5: Deploy the Cloud Run Service

From the `functions/` directory:

```bash
cd functions

gcloud run deploy save-contact \
  --source . \
  --region=us-east1 \
  --allow-unauthenticated \
  --platform=managed \
  --clear-base-image
```

## Step 6: Get Your Service URL

After deployment, the URL will be displayed. It looks like:

```
https://save-contact-857168026110.us-east1.run.app
```

Or retrieve it with:

```bash
gcloud run services describe save-contact --region=us-east1 --format='value(status.url)'
```

## Step 7: Update Your Website

Edit `js/main.js` and set the `CONTACT_FORM_URL` to your service URL:

```javascript
const CONTACT_FORM_URL = 'https://save-contact-857168026110.us-east1.run.app';
```

## Step 8: Test It

1. Open your website
2. Fill out the contact form
3. Submit
4. Check Firestore Console to see the saved data:
   https://console.cloud.google.com/firestore/databases/-default-/data/panel/contacts

## Viewing Submitted Contacts

In the Google Cloud Console:
1. Go to Firestore
2. Click on the `contacts` collection
3. View all submissions with name, email, message, and timestamp

## Cloud Run vs Cloud Functions

This deployment uses **Cloud Run** instead of Cloud Functions:
- More flexible deployment options
- Better scaling control
- Can run any containerized application
- Compatible with Functions Framework for easy migration

## Costs

- **Cloud Run**: 180,000 vCPU-seconds, 360,000 GiB-seconds, 2 million requests/month free
- **Firestore**: 50K reads, 20K writes, 1GB storage free per day
- For a portfolio site, this should be well within free tier

## Troubleshooting

**CORS errors?**
The service includes CORS headers. If issues persist, check browser console for specific errors.

**Service not found?**
Verify the region matches in both deployment and URL.

**Permission denied?**
Ensure the service account has Firestore permissions (Step 4).

**Database not found?**
Ensure Firestore database was created (Step 3).