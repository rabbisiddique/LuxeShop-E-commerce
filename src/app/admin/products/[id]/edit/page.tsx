import { getProduct } from "@/src/actions/admin/admin.products";
import ProductForm from "@/src/components/admin/ProductForm";
import { createClient } from "@/src/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const res = await getProduct(params.id);
  const product = res.data;
  // You may also fetch categories if needed
  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-neutral-200 text-neutral-600 rounded-xl hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-950">
              Edit Product
            </h1>
            <p className="text-neutral-500 mt-1">
              Update your product details.
            </p>
          </div>
        </div>
      </div>
      <ProductForm
        categories={categories || []}
        mode="edit"
        initialData={product}
      />
    </div>
  );
}
