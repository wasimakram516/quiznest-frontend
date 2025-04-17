import { GameProvider } from "@/app/context/GameContext";

export default function GameLayout({ children }) {
  return <GameProvider>{children}</GameProvider>;
}
