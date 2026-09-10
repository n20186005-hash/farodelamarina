import { getWeatherForecast } from "@/lib/weather";
import { WeatherWidget } from "@/components/WeatherWidget";

/**
 * Server Component：在服务端获取天气并缓存，渲染时把结果交给客户端组件。
 * 首屏即为服务端渲染好的预报内容（无闪烁、无布局跳动），
 * 客户端挂载后再拉取一次实时数据做保鲜。
 */
export async function WeatherForecast() {
  const initial = await getWeatherForecast();
  return <WeatherWidget initial={initial} />;
}

export default WeatherForecast;
