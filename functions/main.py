"""
Google Cloud Function to store contact form submissions in Firestore.
"""

import functions_framework
from google.cloud import firestore
from datetime import datetime
import re


def is_valid_email(email):
    """Validate email format."""
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(pattern, email) is not None


@functions_framework.http
def save_contact(request):
    """
    HTTP Cloud Run service to save contact form data to Firestore.

    Args:
        request: The request object containing form data.

    Returns:
        JSON response with success/error status.
    """
    # Handle CORS preflight request
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    # Set CORS headers for main request
    headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}

    # Only accept POST requests
    if request.method != "POST":
        return ({"error": "Method not allowed"}, 405, headers)

    try:
        # Parse request data
        request_json = request.get_json(silent=True)

        if not request_json:
            return ({"error": "No data provided"}, 400, headers)

        name = request_json.get("name", "").strip()
        email = request_json.get("email", "").strip()
        message = request_json.get("message", "").strip()

        # Validate required fields
        if not name:
            return ({"error": "Name is required"}, 400, headers)

        if not email:
            return ({"error": "Email is required"}, 400, headers)

        if not is_valid_email(email):
            return ({"error": "Invalid email format"}, 400, headers)

        # Initialize Firestore client
        db = firestore.Client()

        # Create document data
        contact_data = {
            "name": name,
            "email": email,
            "message": message,
            "created_at": datetime.utcnow(),
            "source": "portfolio_contact_form",
        }

        # Save to Firestore
        db.collection("contacts").add(contact_data)

        return (
            {"success": True, "message": "Thank you! Your message has been received."},
            200,
            headers,
        )

    except Exception as e:
        print(f"Error saving contact: {e}")
        return ({"error": "An error occurred. Please try again."}, 500, headers)
