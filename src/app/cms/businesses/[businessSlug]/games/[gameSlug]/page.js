
import { redirect } from "next/navigation";

export default function GameSlugRedirect({ params }) {
  const { gameSlug } = params;
  const { businessSlug } = params;

  redirect(`/cms/businesses/${businessSlug}/games/${gameSlug}`);
}
