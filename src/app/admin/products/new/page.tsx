import { getCategories } from "@/src/actions/admin/admin.categories";
import ProductForm from "@/src/components/admin/ProductForm";
import { ChevronLeft, Eye } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const { data: categories } = await getCategories();
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
              Add New Product
            </h1>
            <p className="text-neutral-500 mt-1">
              Create a new product listing for your store.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors shadow-sm">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            Save Product
          </button>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
