import ShopPage from "@/src/pages/ShopPage";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ShopPage category={slug} />;
}
