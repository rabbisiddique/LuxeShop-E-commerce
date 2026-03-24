"use client";

import {
  deleteMultipleProducts,
  deleteProduct,
} from "@/src/actions/admin/admin.products";
import { useProducts } from "@/src/hooks/useProducts";
import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  Eye,
  Filter,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";
import Pagination from "./Pagination";

// ─── Status Helper ───────────────────────

const getStatus = (product: any) => {
  if (!product.is_active) return "Draft";
  if (product.stock_quantity === 0) return "Out of Stock";
  if (product.stock_quantity < 10) return "Low Stock";
  return "Active";
};

// ─── Status Badge ────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Low Stock": "bg-amber-50 text-amber-600 border-amber-100",
    "Out of Stock": "bg-rose-50 text-rose-600 border-rose-100",
    Draft: "bg-neutral-100 text-neutral-500 border-neutral-200",
  };

  const icons: Record<string, any> = {
    Active: CheckCircle2,
    "Low Stock": AlertCircle,
    "Out of Stock": AlertCircle,
    Draft: Clock,
  };

  const Icon = icons[status] || Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status] || styles["Draft"]}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

// ─── Main Component ──────────────────────

export default function ProductTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  // ─── Handler ─────────────────────────────

  const handleBulkDelete = async () => {
    setIsBulkDeleting(true);

    const result = await deleteMultipleProducts(selectedProducts);

    if (result.success) {
      toast.success(result.message);
      setSelectedProducts([]); // clear selection
      setShowBulkDelete(false);
    } else {
      toast.error(result.message);
    }

    setIsBulkDeleting(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    const result = await deleteProduct(deleteId);

    if (result.success) {
      toast.success("Product deleted!");
      setDeleteId(null);
    } else {
      toast.error(result.message);
    }

    setIsDeleting(false);
  };

  const { products, pagination, isLoading } = useProducts({
    page,
    limit: 10,
    category,
    search: searchQuery,
    active: false,
    realtime: true,
  });

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p: any) => p.id));
    }
  };

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 lg:p-6 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-neutral-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <Link href="/admin/products/new">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-neutral-950 text-white px-6 py-3 flex items-center justify-between overflow-hidden"
          >
            <span className="text-sm font-medium">
              {selectedProducts.length} products selected
            </span>
            <div className="flex items-center gap-4">
              <button className="text-sm font-bold hover:text-primary transition-colors">
                Update Status
              </button>

              <button
                onClick={() => setShowBulkDelete(true)}
                className="text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50 border-b border-neutral-200">
              <th className="px-6 py-4 w-12">
                <div
                  onClick={toggleSelectAll}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                    selectedProducts.length === products.length &&
                    products.length > 0
                      ? "bg-primary border-primary"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {selectedProducts.length === products.length &&
                    products.length > 0 && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-600 transition-colors">
                  Price <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-600 transition-colors">
                  Stock <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <div className="flex items-center justify-center gap-2 text-neutral-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading products...</span>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <p className="text-sm text-neutral-400">No products found</p>
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr
                  key={product.id}
                  className={`group hover:bg-neutral-50/50 transition-colors ${
                    selectedProducts.includes(product.id)
                      ? "bg-primary-light/30"
                      : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <div
                      onClick={() => toggleSelectProduct(product.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                        selectedProducts.includes(product.id)
                          ? "bg-primary border-primary"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {selectedProducts.includes(product.id) && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-200 shrink-0 bg-neutral-100">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-950 group-hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="px-6 py-4 text-sm font-mono text-neutral-500">
                    {product.sku ?? "—"}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {product.categories?.name ?? "—"}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-bold text-neutral-950">
                    ${product.base_price?.toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-sm font-bold ${
                          product.stock_quantity === 0
                            ? "text-rose-600"
                            : product.stock_quantity < 10
                              ? "text-amber-600"
                              : "text-neutral-950"
                        }`}
                      >
                        {product.stock_quantity}
                      </span>
                      <div className="w-16 h-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            product.stock_quantity === 0
                              ? "bg-rose-500"
                              : product.stock_quantity < 10
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              (product.stock_quantity / 100) * 100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={getStatus(product)} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/products/${product.slug}`} target="_blank">
                        <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ConfirmDialog
                        isOpen={!!deleteId}
                        title="Delete Product"
                        description={`Are you sure you want to 
              delete "${product.name}"? This action 
              cannot be undone.`}
                        confirmLabel="Delete Product"
                        isLoading={isDeleting}
                        onConfirm={handleDelete}
                        onCancel={() => setDeleteId(null)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={showBulkDelete}
        title={`Delete ${selectedProducts.length} Products`}
        description={`Are you sure you want to delete ${selectedProducts.length} selected products? This action cannot be undone.`}
        confirmLabel={`Delete ${selectedProducts.length} Products`}
        isLoading={isBulkDeleting}
        onConfirm={handleBulkDelete}
        onCancel={() => setShowBulkDelete(false)}
      />

      {/* Pagination */}
      {pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
