from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import re

app = Flask(__name__)
CORS(app)

API_KEY = "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"

chat_history = [
    {
        "role": "system",
        "content": (
            "Kamu adalah chatbot ahli kesehatan manusia. "
            "Jawablah hanya seputar topik kesehatan, penyakit, gejala, pengobatan, vitamin, gaya hidup sehat, dan konsultasi kesehatan umum. "
            "Tolak permintaan pengguna yang menanyakan hal di luar kesehatan seperti membuat program, kode, teknologi, hukum, ekonomi, asmara, atau topik lain. "
            "Jika pengguna menanyakan hal di luar kesehatan, cukup balas: 'Maaf, saya hanya bisa membantu topik kesehatan manusia.'"
        )
    }
]

# Topik yang diizinkan
allowed_keywords = [
    'hi', 'hai', 'halo', 'penyakit', 'kesehatan', 'gejala', 'pengobatan',
    'dokter', 'rumah sakit', 'obat', 'vitamin', 'gaya hidup sehat',
    'medical', 'health', 'illness', 'hospital', 'medicine', 'demam',
    'batuk', 'pilek', 'luka', 'nutrisi', 'gizi', 'imun', 'imunisasi',
    'vaksin', 'diagnosa', 'terapi', 'fisik', 'mental','konsultasi', 'konsultasi kesehatan',
    'kesehatan mental', 'psikologi', 'psikiatri', 'kesehatan jiwa',
    'kesehatan reproduksi', 'kesehatan anak', 'kesehatan lansia',
    'kesehatan ibu', 'kesehatan seksual', 'kesehatan gigi',
    'kesehatan mata', 'kesehatan kulit', 'kesehatan telinga','siapa namamu','masuk angin','sehat','penyakit menular','penyakit tidak menular',
    'penyakit kronis', 'penyakit infeksi', 'penyakit degeneratif',
    'penyakit autoimun', 'penyakit genetik', 'penyakit langka','gangguan mental',
    'penyakit tropis', 'penyakit pernapasan', 'penyakit jantung','gila',
]

# Jawaban lanjutan (tanpa topik baru)
followup_keywords = ['iya', 'ya', 'lanjut', 'teruskan', 'jelaskan', 'boleh', 'oke', 'tentu', 'pasti','berikan lagi', 'tambahin', 'lanjutkan']

# Topik yang dilarang
forbidden_keywords = [
    'kode', 'program', 'script', 'python', 'javascript', 'html', 'css',
    'flutter', 'android', 'laravel', 'react', 'node', 'ngoding', 'teknologi',
    'AI', 'chatgpt', 'openai', 'gpt', 'code', 'algoritma', 'data', 'aplikasi',
    'buatkan', 'source code', 'c++', 'java', 'coding', 'sql'
]

def is_allowed_topic(user_input):
    user_input = user_input.lower().strip()
    if user_input in followup_keywords:
        return True

    for forbidden in forbidden_keywords:
        if forbidden in user_input:
            return False
    # Jika mengandung topik yang diizinkan → izinkan
    return any(kw in user_input for kw in allowed_keywords)

def clean_response(text):
    text = re.sub(r'\*+', '', text)
    text = re.sub(r'`+', '', text)
    text = re.sub(r'\n\s*\n', '\n', text)
    return text.strip()

def ask_chatbot(question):
    if not is_allowed_topic(question):
        return "Maaf, saya hanya bisa membantu topik kesehatan manusia."

    chat_history.append({"role": "user", "content": question})

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "mistralai/mistral-small-3.1-24b-instruct:free",
        "messages": chat_history
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        if response.status_code == 200:
            reply = response.json()['choices'][0]['message']['content']
            reply = clean_response(reply)
            chat_history.append({"role": "assistant", "content": reply})
            return reply
        else:
            return f"Error: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Terjadi kesalahan: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    answer = ask_chatbot(user_input)
    return jsonify({"reply": answer})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
