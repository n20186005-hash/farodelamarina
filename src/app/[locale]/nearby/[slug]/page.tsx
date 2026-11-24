import {notFound} from "next/navigation";
import places from "@/data/nearby-places.json";
import labels from "@/data/nearby-labels.json";
import {siteUrl} from "@/site.config";
type Lang=keyof typeof labels;
type Props={params:Promise<{locale:Lang;slug:string}>};
export function generateStaticParams(){return places.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props){
 const {locale,slug}=await params;const place=places.find(p=>p.slug===slug);if(!place)notFound();
 const item=place.local[locale];const path="/nearby/"+slug;
 return {title:item.name+" · Miraflores",description:item.story,alternates:{canonical:siteUrl+"/"+locale+path,languages:Object.fromEntries(Object.keys(labels).map(l=>[l,siteUrl+"/"+l+path]))},openGraph:{title:item.name,description:item.story,images:[place.photo]}};
}
export default async function Guide({params}:Props){
 const {locale,slug}=await params;const n=places.findIndex(p=>p.slug===slug);if(n<0)notFound();
 const p=places[n],v=p.local[locale],t=labels[locale],dir="/"+locale+"/nearby";
 const map="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.local.es.name+", "+p.address);
 const hours=p.hours||t[21];const fee=p.free?t[22]:t[23];
 const related=places.filter(o=>o.slug!==slug&&o.kind===p.kind).slice(0,3);
 if(!related.length)related.push(places[(n+1)%places.length]);
 const history=v.story.match(/^.*?[。.!?](?:\s|$|(?=[\u3400-\u9fff]))/u)?.[0]?.trim()||v.story;
 const observation=v.story.slice(history.length).trim()||v.steps[1];
 const q=[[t[27],v.steps[0]],[t[28],v.field],[t[29],v.steps[2]]];
 return <main lang={locale}>
 <div className="nearby-hero"><img src={p.photo} alt={v.name} fetchPriority="high" referrerPolicy="no-referrer"/><header><a href={dir}>{t[0]}</a><h1>{v.name}</h1><p>{p.local.es.name} · Miraflores, Lima</p><p>{t[7]} · {hours}</p><a href={map}>{t[15]}</a> · <a href={map}>{t[19]}</a></header></div>
 <article className="nearby-body">
 <section><h2>{t[2]}</h2><p>{v.name} · {p.address}</p><p>{observation}</p></section>
 <section><h2>{t[3]}</h2><p>{v.steps[0]} {t[38]}</p></section>
 <section><h2>{t[4]}</h2><p>{v.steps[1]}</p></section>
 <section><h2>{t[5]}</h2><p>{p.local.es.name} · {p.address}</p><h3>{t[6]}</h3><table><tbody>{[[t[24],v.name],[t[25],p.address],[t[26],p.manager],[t[7],hours],[t[8],fee]].map(([k,val])=><tr key={k}><th scope="row">{k}</th><td>{val}</td></tr>)}</tbody></table></section>
 <section><h2>{t[7]}</h2><p>{hours}{p.hours&&" · "+t[38]}</p></section><section><h2>{t[8]}</h2><p>{fee}</p><a href={p.moreSource}>{t[34]}</a></section>
 <section><h2>{t[9]}</h2><p>{p.address}. {v.steps[0]}</p><a href={map}>{t[19]}</a></section>
 <section><h2>{t[10]}</h2><p>{history}</p></section>
 <section><h2>{t[11]}</h2><ol>{v.steps.map(step=><li key={step}>{step}</li>)}</ol></section>
 <section><h2>{t[12]}</h2><p>{t[37]}</p></section><section><h2>{t[13]}</h2><p>{v.field}</p><a href={p.credit}>{t[33]}</a></section>
 <section><h2>{t[14]}</h2><p>{t[36]}</p></section><section><h2>{t[15]}</h2><a href={map}>{t[20]}</a></section>
 <section><h2>{t[16]}</h2><address>{p.address}</address><a href={map}>{t[19]}</a></section>
 <section><h2>{t[17]}</h2>{q.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
 <section><h2>{t[18]}</h2><a href={p.source}>{t[32]}</a>{p.moreSource!==p.source&&<> · <a href={p.moreSource}>{t[34]}</a></>} · <a href={p.credit}>{t[33]}</a></section>
 <section><h2>{t[30]}</h2><ul className="nearby-grid">{related.map(o=><li key={o.slug}><a href={dir+"/"+o.slug}>{o.local[locale].name}</a></li>)}</ul><a href={dir}>{t[31]}</a></section>
 </article></main>;
}