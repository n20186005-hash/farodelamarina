import { LangProvider } from "@/components/LangProvider";
import { Nav, Footer } from "@/components/HomeClient";
import type { Locale } from "@/i18n/translations";
export default async function NearbyLayout({params,children}:{params:Promise<{locale:string}>,children:React.ReactNode}){
 const {locale}=await params;
 return <LangProvider initialLocale={locale as Locale}><Nav />{children}<Footer /></LangProvider>;
}