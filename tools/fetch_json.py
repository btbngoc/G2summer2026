import urllib.request
u='http://localhost:8000/assets/itinerary_web.json'
try:
    s=urllib.request.urlopen(u,timeout=5).read().decode('utf-8')
    print(s[:1000])
except Exception as e:
    print('ERR',e)
