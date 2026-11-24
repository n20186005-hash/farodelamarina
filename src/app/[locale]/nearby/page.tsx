import items from "@/data/nearby-index.json";
import labels from "@/data/nearby-labels.json";
import {siteUrl} from "@/site.config";
type Lang=keyof typeof labels;
type Props={params:Promise<{locale:Lang}>};
export async function generateMetadata({params}:Props){
 const {locale}=await params;
 return {title:labels[locale][1],description:labels[locale][35],alternates:{canonical:siteUrl+"/"+locale+"/nearby",languages:Object.fromEntries(Object.keys(labels).map(l=>[l,siteUrl+"/"+l+"/nearby"]))}};
}
export default async function Directory({params}:Props){
 const {locale}=await params;const t=labels[locale];
 return <main className="nearby-directory" lang={locale}><a href={"/"+locale}>Faro de la Marina</a><h1>{t[1]}</h1><p>{t[35]}</p><ul className="nearby-grid">{items.map(p=><li key={p.slug}><a href={"/"+locale+"/nearby/"+p.slug}>{p.names[locale]}</a></li>)}</ul></main>;
}