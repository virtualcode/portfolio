# Use Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY main.py .

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Set environment variables
ENV PORT=8080

# Run the application using Functions Framework
CMD ["functions-framework", "--target=save_contact", "--port=8080", "--debug"]