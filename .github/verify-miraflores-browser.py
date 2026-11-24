from pathlib import Path
from playwright.sync_api import sync_playwright
import json
base='https://farodelamarina.com'
items={'zh':'playa-redondo','es':'huaca-pucllana','en':'parque-del-amor','qu':'parque-bicentenario'}
folder=Path('browser-evidence')
folder.mkdir(exist_ok=True)
results=[]
def width(page):
    return page.evaluate("""() => ({viewport:document.documentElement.clientWidth, content:document.documentElement.scrollWidth})""")
def check(page,category):
    dims=width(page)
    record={'screen':screen,'page':category,'url':page.url,**dims}
    record['overflow']=dims['content']-dims['viewport']
    if record['overflow']>1:
        record['overruns']=page.evaluate("""()=>Array.from(document.querySelectorAll('body *')).filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(e=>e.tagName+'.'+e.className)""")
    results.append(record)
    return record
with sync_playwright() as pw:
    browser=pw.chromium.launch(channel='chrome',headless=True)
    for screen,w,h in [('desktop',1440,900),('mobile',390,844)]:
        ctx=browser.new_context(viewport={'width':w,'height':h},device_scale_factor=1,is_mobile=screen=='mobile',has_touch=screen=='mobile',reduced_motion='reduce')
        page=ctx.new_page()
        page.set_default_timeout(20000)
        for lang,slug in items.items():
            page.goto(base+'/'+lang,wait_until='domcontentloaded')
            home=page.locator('footer').inner_text()
            anchors=page.locator('footer a').evaluate_all('(a)=>a.map(e=>[e.innerText,e.getAttribute("href")])')
            check(page,'homepage')
            if lang=='zh':
                page.screenshot(path=folder/(screen+'-zh-home.png'),animations='disabled')
                page.locator('.hero-cta[href="/zh/nearby"]').click()
                page.wait_for_url('**/zh/nearby*')
                directory=check(page,'directory')
                directory['links']=page.locator('main .nearby-grid li a').count()
                page.screenshot(path=folder/(screen+'-zh-directory.png'),animations='disabled')
                page.locator('main a[href="/zh/nearby/'+slug+'"]').click()
                page.wait_for_url('**/zh/nearby/'+slug+'*')
            else:
                page.goto(base+'/'+lang+'/nearby/'+slug,wait_until='domcontentloaded')
            image=page.locator('.nearby-hero img')
            image.evaluate('(el)=>el.decode()')
            page.evaluate('document.fonts.ready')
            detail=check(page,'attraction')
            detail['image']=image.evaluate('(e)=>[e.currentSrc,e.naturalWidth,e.naturalHeight]')
            detail['h1']=page.locator('h1').inner_text()
            detail['footerMatchesHome']=page.locator('footer').inner_text()==home and page.locator('footer a').evaluate_all('(a)=>a.map(e=>[e.innerText,e.getAttribute("href")])')==anchors
            detail['footerLinks']=len(anchors)
            detail['legal']=page.locator('footer .footer-legal a').count()==3 and page.locator('.footer-copyright-note').is_visible()
            detail['footerReachable']=page.locator('footer').bounding_box()['height']>0
            detail['faqCount']=page.locator('details').count()
            page.screenshot(path=folder/(screen+'-'+lang+'-hero.png'),animations='disabled')
            page.locator('footer').screenshot(path=folder/(screen+'-'+lang+'-footer.png'),animations='disabled')
            if lang=='zh':page.screenshot(path=folder/(screen+'-zh-complete.png'),full_page=True,animations='disabled')
        ctx.close()
    browser.close()
(folder/'results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
bad=[r for r in results if r['overflow']>1 or (r['page']=='directory' and r['links']!=31) or (r['page']=='attraction' and (not all(r[k] for k in ['footerMatchesHome','legal','footerReachable','h1']) or r['image'][1]<200 or r['faqCount']<3))]
print(json.dumps({'checked':len(results),'offending':bad},ensure_ascii=False))
assert not bad
