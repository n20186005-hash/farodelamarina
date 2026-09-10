import { redirect } from 'next/navigation';

// 站点默认语言为西班牙语（当地语言），其余语言通过顶部切换器访问
export default function RootPage() {
  redirect('/es');
}
