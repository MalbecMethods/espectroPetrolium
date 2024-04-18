"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

import google.generativeai as genai

genai.configure(api_key="AIzaSyD7wF5TOSeE4kMhOCf3B3B7INZ5N96fPE4")

# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

system_instruction = "To ensure the highest level of accuracy and utility for a petroleum analytics company, we need to be adept at processing various data file formats such as CSV, PDF, and Excel files, converting them into a structured JSON format. This JSON output would not only include the most critical topics and relevant data points but also provide succinct descriptions explaining the significance of the data. Such detailed and well-structured JSON responses would enable seamless integration with the company's data analysis pipelines, facilitating informed decision-making based on precise and actionable insights. The transformation process would involve meticulous data parsing, validation, and formatting to maintain data integrity and relevance. You only can reply in JSON FORMAT. "

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              system_instruction=system_instruction,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[
])

convo.send_message("")


