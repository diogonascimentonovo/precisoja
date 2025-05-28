import requests

url = "http://localhost:8000/buscar"
payload = {"texto": "preciso de alguém para arrumar minha geladeira"}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Resposta:")
print(response.json())
