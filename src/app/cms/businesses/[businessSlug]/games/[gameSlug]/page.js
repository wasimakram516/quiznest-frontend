import { redirect } from "next/navigation";

export default function GameSlugRedirect({ params }) {
  const { businessSlug, gameSlug } = params;
  redirect(`/cms/businesses/${businessSlug}/games/${gameSlug}`);
}
