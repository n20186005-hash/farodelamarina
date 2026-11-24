import threading, concurrent.futures, json, time, urllib.request, html, re
from html.parser import HTMLParser
from pathlib import Path

base='https://farodelamarina.com'
places=json.loads(Path('src/data/nearby-places.json').read_text())
labels=json.loads(Path('src/data/nearby-labels.json').read_text())
class Parsed(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags=[]; self.links=[]; self.images=[]; self.parts=[]
    def handle_starttag(self,t,a):
        self.tags.append(t); a=dict(a)
        if t=='a': self.links.append(a.get('href','').rstrip('/'))
        if t=='img': self.images.append(a.get('src',''))
    def handle_data(self,s): self.parts.append(s)
def get(path):
    req=urllib.request.Request(base+path, headers={'User-Agent':'Mozilla/5.0 destination-guide-acceptance'})
    with urllib.request.urlopen(req,timeout=18) as r: body=r.read().decode()
    doc=Parsed();doc.feed(body);return doc
def directory_ready():
    try:return places[0]['local']['zh']['feature'] in ' '.join(get('/zh/nearby/playa-redondo').parts)
    except Exception:return False
for n in range(45):
    if directory_ready():break
    time.sleep(10)
else:raise RuntimeError('New directory not available on production')
def photo_check(p, doc):
    candidates=[u for u in doc.images if u.startswith('/nearby-photos/') or u==p['photo']]
    assert candidates, 'missing destination image: '+p['slug']
    u=candidates[0]; request=urllib.request.Request(base+u if u.startswith('/') else u, headers={'User-Agent':'Mozilla/5.0','Range':'bytes=0-63'})
    with urllib.request.urlopen(request,timeout=20) as r:
        data=r.read(64)
        assert (data.startswith((b'RIFF',b'GIF',b'\xff\xd8',b'\x89PNG')) or data[4:8]==b'ftyp'), (p['slug'],r.headers.get('content-type'))
    return
def check(args):
    l,p=args;directory='/'+l+'/nearby';url=directory+'/'+p['slug']
    for n in range(3):
        try:
            doc=get(url);v=p['local'][l];t=labels[l];txt=' '.join(doc.parts)
            assert 'footer' in doc.tags and 'h1' in doc.tags and doc.tags.count('details')>=3 and 'ol' in doc.tags and 'table' in doc.tags
            assert v['name'] in txt and v['field'] in txt and all(s in txt for s in v['steps'])
            assert all(t[i] in txt for i in [7,8,13,14,15,16,17]) and v['feature'] in txt and v['advice'] in txt and v['approach'] in txt
            if l=='zh': photo_check(p,doc)
            assert directory in doc.links and all('/'+lang+'/nearby/'+p['slug'] in doc.links for lang in labels)
            assert any('google.com/maps/' in x for x in doc.links)
            return
        except Exception as exc:
            if n==2: raise RuntimeError(url) from exc
            time.sleep(2)
for l in labels:
    d='/'+l+'/nearby'; home=get('/'+l); directory=get(d)
    assert d in home.links and 'footer' in home.tags
    assert all(d+'/'+p['slug'] in directory.links for p in places) and 'footer' in directory.tags
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:list(pool.map(check,[(l,p) for l in labels for p in places]))
print('Verified four production homepages, four directories and 124 complete attraction pages.')
