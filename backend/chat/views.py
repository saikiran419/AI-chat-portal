import google.generativeai as genai
import os
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("Available Gemini models that support generateContent:")
for m in genai.list_models():
    if "generateContent" in m.supported_generation_methods:
        print(m.name)

class ChatViewSet(ModelViewSet):
    queryset = Message.objects.all().order_by('created_at')
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        # First, save the user's message
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        self.perform_create(user_serializer)

        # Get the whole conversation history
        messages = Message.objects.all().order_by('created_at')
        history = [
            {"role": "user" if msg.role == "user" else "model", "parts": [msg.content]}
            for msg in messages
        ]

        # Send to Gemini
        model = genai.GenerativeModel('gemini-2.5-flash-lite')
        response = model.generate_content(history)

        ai_reply = response.text

        # Save AI message
        ai_msg_data = {'role': 'assistant', 'content': ai_reply}
        ai_serializer = self.get_serializer(data=ai_msg_data)
        ai_serializer.is_valid(raise_exception=True)
        self.perform_create(ai_serializer)

        return Response(ai_serializer.data)
