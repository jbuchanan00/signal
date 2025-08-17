import type { Route } from "./+types/home";
import View from '../view/view'

export function meta({}: Route.MetaArgs) {
  return [
    
  ];
}

export default function Home() {
  return <View />
}
