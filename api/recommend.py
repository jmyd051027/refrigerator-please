from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 1. 사용자가 보낸 재료 받기
        length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(length))
        ingredients = body.get('ingredients', '')

        # 2. AI에게 물어볼 질문 만들기
        prompt = f"냉장고에 있는 재료: {ingredients}\n이 재료로 만들 수 있는 요리 3가지를 추천하고, 각각 간단한 조리법을 알려줘."

        # 3. 교육장 정보 가져오기
        url = "https://copa.codyssey.kr/v1/chat/completions"
        api_key = os.environ.get('OPENAI_KEY')

        # 4. AI에게 요청 보내기
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        data = {
            'model': 'gpt-5.4-mini',
            'messages': [{'role': 'user', 'content': prompt}]
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode(),
            headers=headers
        )
        res = urllib.request.urlopen(req)
        result = json.loads(res.read())
        answer = result['choices'][0]['message']['content']

        # 5. 결과 돌려주기
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'result': answer}).encode())