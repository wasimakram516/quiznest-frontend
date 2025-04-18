
import { redirect } from "next/navigation";

export default function GameSlugRedirect({ params }) {
  const { gameSlug } = params;

  redirect(`/cms/businesses/${gameSlug}/games`);
}
