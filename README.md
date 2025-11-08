🤖 AI Chatbot Backend
This is the backend for an AI Chatbot application, built with Django and Django REST Framework. It leverages the Google Gemini API for generating AI responses.

✨ Features
💬 Chat Functionality: Users can send messages and receive AI-generated responses.
🧠 Gemini Integration: Utilizes the gemini-2.5-flash-lite model for intelligent conversational AI.
🚀 RESTful API: Provides a clean and well-structured API for chat interactions.
💾 PostgreSQL Database: Stores chat messages persistently.
⚙️ Scalable Architecture: Built with Django, offering a robust and scalable foundation.
🛠️ Technologies Used
Django: Web framework for rapid development.
Django REST Framework: Toolkit for building Web APIs.
PostgreSQL: Relational database for data storage.
Google Gemini API: For AI-powered conversational responses.
python-dotenv: For managing environment variables.
🚀 Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Python 3.10+
PostgreSQL
pip (Python package installer)
Installation
Clone the repository:

git clone <repository_url>
cd ai_chatbot_be
Create a virtual environment and activate it:

python -m venv .venv
source .venv/bin/activate
Install dependencies:

pip install -r requirements.txt
Set up environment variables:

Create a .env file in the root directory of the project based on .env.example:

GEMINI_API_KEY=your_gemini_api_key
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
Replace the placeholder values with your actual Gemini API key and PostgreSQL database credentials.

Run database migrations:

python manage.py migrate
*** Remove WRONG dotenv and re-install correct one INSIDE venv

Copy & paste exactly:

pip uninstall dotenv -y
pip uninstall python-dotenv -y
pip install python-dotenv
***VERIFY python-dotenv is installed in the correct environment

pip show python-dotenv

***VERY IMPORTANT: Run Django using the venv Python directly

Run this exact command (don’t use python3):

./.venv/bin/python manage.py runserver
Start the development server:

python manage.py runserver
The API will be available at http://127.0.0.1:8000/.

📝 API Endpoints
The API provides the following endpoint for chat interactions:

POST /api/chat/
Description: Sends a new message to the chatbot and receives an AI-generated response.
Request Body:
{
  "role": "user",
  "content": "Hello, how are you?"
}
Response:
{
  "id": 1,
  "role": "assistant",
  "content": "I'm doing well, thank you for asking! How can I help you today?",
  "created_at": "2023-10-27T10:00:00Z"
}
GET /api/chat/
Description: Retrieves the entire conversation history.
Response: A list of message objects, ordered by created_at.
📂 Project Structure
.
├── .env                  # Environment variables
├── manage.py             # Django management script
├── requirements.txt      # Project dependencies
├── chat/                 # Chat application
│   ├── models.py         # Database models (Message)
│   ├── serializers.py    # Data serialization for API
│   ├── views.py          # API views and Gemini integration logic
│   └── urls.py           # API endpoint routing for chat
└── config/               # Project configuration
    ├── settings.py       # Django settings
    └── urls.py           # Main URL routing
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.








📄 License
This project is licensed under the MIT License.
