# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install uvicorn fastapi

# Copy app code
COPY . .

# Expose the port FastAPI will run on
EXPOSE 8000

# Run the app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
