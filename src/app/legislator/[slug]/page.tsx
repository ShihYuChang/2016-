'use client';

export default function LegislatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const encodedSlug = encodeURIComponent(params.slug);
  const decodedSlug = decodeURIComponent(encodedSlug).replace(
    /(%[0-9A-F]{2})+/gi,
    decodeURIComponent
  );
  return <div>Legislator: {decodedSlug}</div>;
}
