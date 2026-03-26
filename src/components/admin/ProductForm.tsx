"use client";

import { Category, ImageItem, Product, Variant } from "@/index.type";
import { addProduct, updateProduct } from "@/src/actions/admin/admin.products";
import { deleteProductImage, uploadProductImage } from "@/src/actions/upload";
import {
  DollarSign,
  Eye,
  ImageIcon,
  Info,
  Layers,
  Loader2,
  Package,
  Plus,
  Save,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type ProductFormProps = {
  categories: Category[];
  mode: "create" | "edit";
  initialData?: Product;
};

export default function ProductForm({
  categories,
  mode,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [activeTab, setActiveTab] = useState("General");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantValueInput, setVariantValueInput] = useState<{
    [key: number]: string;
  }>({});

  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    slug: "",
    description: "",

    // Organization
    category_id: "",

    // Pricing
    base_price: 0,
    compare_price: 0,
    cost_price: 0,

    // Inventory
    sku: "",
    stock_quantity: 0,

    // Media
    images: [] as string[],

    // Tags
    tags: [] as string[],

    // Variants
    has_variants: false,
    variants: [] as {
      name: string;
      options: Record<string, string>;
      price: number;
      stock_quantity: number;
    }[],

    // Status
    is_active: true,
    is_featured: false,
  });

  const tabs = ["General", "Pricing", "Inventory", "Variants"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? value === ""
              ? 0
              : Number(value)
            : value,
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  // ─── Tag Handlers ────────────────────────

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        setFormData((prev) => ({ ...prev, tags: newTags }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  // ─── Variant Handlers ────────────────────

  // In ProductForm.tsx

  const syncVariantsToFormData = (
    updatedVariants: {
      id: number;
      name: string;
      values: string[];
    }[],
  ) => {
    // ✅ Force clean array
    const formVariants: {
      name: string;
      options: Record<string, string>;
      price: number;
      stock_quantity: number;
    }[] = [];

    updatedVariants.forEach((v) => {
      v.values.forEach((val) => {
        formVariants.push({
          name: `${v.name}: ${val}`,
          options: {
            [v.name.toLowerCase()]: val,
          },
          price: formData.base_price || 0,
          stock_quantity: 0,
        });
      });
    });

    setFormData((prev) => ({
      ...prev,
      variants: formVariants,
      has_variants: formVariants.length > 0,
    }));
  };

  const addVariantOption = () => {
    const newId =
      variants.length > 0 ? Math.max(...variants.map((v) => v.id)) + 1 : 1;
    const updated = [
      ...variants,
      { id: newId, name: "New Option", values: [] },
    ];
    setVariants(updated);
    syncVariantsToFormData(updated);
  };

  const removeVariantOption = (id: number) => {
    const updated = variants.filter((v) => v.id !== id);
    setVariants(updated);
    syncVariantsToFormData(updated);
  };

  const updateVariantName = (id: number, name: string) => {
    const updated = variants.map((v) => (v.id === id ? { ...v, name } : v));
    setVariants(updated);
    syncVariantsToFormData(updated);
  };

  const addVariantValue = (variantId: number) => {
    const value = variantValueInput[variantId]?.trim();
    if (value) {
      const updated = variants.map((v) => {
        if (v.id === variantId && !v.values.includes(value)) {
          return { ...v, values: [...v.values, value] };
        }
        return v;
      });
      setVariants(updated);
      syncVariantsToFormData(updated);
      setVariantValueInput({ ...variantValueInput, [variantId]: "" });
    }
  };

  const handleVariantValueKeyDown = (
    e: React.KeyboardEvent,
    variantId: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addVariantValue(variantId);
    }
  };

  const removeVariantValue = (variantId: number, valueToRemove: string) => {
    const updated = variants.map((v) => {
      if (v.id === variantId) {
        return {
          ...v,
          values: v.values.filter((val) => val !== valueToRemove),
        };
      }
      return v;
    });
    setVariants(updated);
    syncVariantsToFormData(updated);
  };

  // ─── Image Handlers ──────────────────────

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check max 5 images
    const remainingSlots = 5 - imageItems.length;
    if (remainingSlots <= 0) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    // Take only allowed number of files
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (Array.from(files).length > remainingSlots) {
      toast.warning(
        `Only ${remainingSlots} slot(s) remaining. 
       Uploading first ${remainingSlots} image(s).`,
      );
    }

    // Add placeholders with uploading state
    const placeholders: ImageItem[] = filesToUpload.map(() => ({
      url: "",
      uploading: true,
    }));

    setImageItems((prev) => [...prev, ...placeholders]);

    // Upload all files simultaneously
    const uploadPromises = filesToUpload.map(async (file, index) => {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadProductImage(formData);

      return { result, index };
    });

    const results = await Promise.all(uploadPromises);

    // Update image items with real URLs
    setImageItems((prev) => {
      const updated = [...prev];
      const startIndex = updated.length - filesToUpload.length;

      results.forEach(({ result, index }) => {
        const itemIndex = startIndex + index;
        if (result.success && result.url) {
          updated[itemIndex] = {
            url: result.url,
            uploading: false,
          };
          toast.success(`Image ${index + 1} uploaded!`);
        } else {
          // Remove failed upload placeholder
          updated.splice(itemIndex, 1);
          toast.error(result.message ?? "Upload failed");
        }
      });

      // Sync to formData
      const urls = updated
        .filter((img) => !img.uploading && img.url)
        .map((img) => img.url);

      setFormData((p) => ({ ...p, images: urls }));

      return updated.filter((img) => img.uploading || img.url);
    });

    // Reset input
    e.target.value = "";
  };

  const handleRemoveImage = async (index: number) => {
    const item = imageItems[index];
    if (!item.url) return;

    // Remove from UI immediately
    const updated = imageItems.filter((_, i) => i !== index);
    setImageItems(updated);

    // Sync to formData
    const urls = updated.filter((img) => img.url).map((img) => img.url);
    setFormData((prev) => ({ ...prev, images: urls }));

    // Delete from storage
    const result = await deleteProductImage(item.url);
    if (!result.success) {
      toast.error("Failed to delete image");
    }
  };

  // ─── Submit ──────────────────────────────

  const handleSubmit = async () => {
    // Validate
    console.log(formData);

    if (!formData.name) {
      toast.error("Product name is required");
      return;
    }
    if (!formData.category_id) {
      toast.error("Please select a category");
      return;
    }
    if (formData.base_price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsLoading(true);
    if (mode === "edit") {
      const result = await updateProduct(initialData!.id, formData);
      console.log("res", result);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/products");
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } else {
      const result = await addProduct(formData);
      console.log("res", result);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/products");
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    }
  };

  // useEffects

  useEffect(() => {
    if (mode !== "edit" || !initialData) return;

    // ─── Form Data ───────────────────────
    setFormData({
      name: initialData.name ?? "",
      slug: initialData.slug ?? "",
      description: initialData.description ?? "",
      category_id: initialData.category_id ?? "",
      base_price: initialData.base_price ?? 0,
      compare_price: initialData.compare_price ?? 0,
      cost_price: initialData.cost_price ?? 0,
      sku: initialData.sku ?? "",
      stock_quantity: initialData.stock_quantity ?? 0,
      images: initialData.images ?? [],
      tags: initialData.tags ?? [],
      has_variants: initialData.has_variants ?? false,
      variants: initialData.product_variants ?? [],
      is_active: initialData.is_active ?? true,
      is_featured: initialData.is_featured ?? false,
    });

    // ─── Tags ────────────────────────────
    setTags(initialData.tags ?? []);

    // ─── Images ──────────────────────────
    setImageItems(
      (initialData.images ?? []).map((url: string) => ({
        url,
        uploading: false,
      })),
    );

    // ─── Variants ────────────────────────
    const productVariants = initialData.product_variants ?? [];

    if (productVariants.length === 0) return;

    // Group by option name using reduce
    const grouped = productVariants.reduce(
      (
        acc: { id: number; name: string; values: string[] }[],
        v: any,
        i: number,
      ) => {
        const [optionName, optionValue] = v.name
          .split(":")
          .map((s: string) => s.trim());

        const existing = acc.find(
          (a) => a.name.toLowerCase() === optionName.toLowerCase(),
        );

        if (existing) {
          existing.values.push(optionValue);
        } else {
          acc.push({
            id: i + 1,
            name: optionName.charAt(0).toUpperCase() + optionName.slice(1),
            values: [optionValue],
          });
        }

        return acc;
      },
      [],
    );

    setVariants(grouped);
  }, [initialData, mode]);

  // ─── Render ──────────────────────────────

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column */}
      <div className="flex-1 space-y-8">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-500 border border-neutral-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Basic Information */}
        <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-light rounded-lg">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-display font-bold">
              Basic Information
            </h3>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Classic Silk Blouse"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                placeholder="auto-generated-from-name"
                value={formData.slug}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Description
              </label>
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200 flex items-center gap-4">
                  <button
                    type="button"
                    className="text-xs font-bold text-neutral-600 hover:text-primary transition-colors"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="text-xs italic text-neutral-600 hover:text-primary transition-colors"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="text-xs underline text-neutral-600 hover:text-primary transition-colors"
                  >
                    U
                  </button>
                  <div className="w-px h-4 bg-neutral-300" />
                  <button
                    type="button"
                    className="text-xs text-neutral-600 hover:text-primary transition-colors"
                  >
                    Link
                  </button>
                  <button
                    type="button"
                    className="text-xs text-neutral-600 hover:text-primary transition-colors"
                  >
                    List
                  </button>
                </div>
                <textarea
                  name="description"
                  rows={6}
                  placeholder="Describe your product in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 text-sm focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pricing */}
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-display font-bold">Pricing</h3>
            </div>

            <div className="space-y-4">
              {/* Base Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Base Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    name="base_price"
                    placeholder="0.00"
                    value={formData.base_price}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Compare Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Discount Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    name="compare_price"
                    placeholder="0.00"
                    value={formData.compare_price}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Cost Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Cost Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    name="cost_price"
                    placeholder="0.00"
                    value={formData.cost_price}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Margin Calculator */}
              {formData.base_price > 0 && formData.cost_price > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600">
                    Margin: $
                    {(formData.base_price - formData.cost_price).toFixed(2)} (
                    {(
                      ((formData.base_price - formData.cost_price) /
                        formData.base_price) *
                      100
                    ).toFixed(1)}
                    % )
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Inventory */}
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-display font-bold">Inventory</h3>
            </div>

            <div className="space-y-4">
              {/* SKU */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  placeholder="e.g. LS-SB-001"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock_quantity"
                  placeholder="0"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <label className="text-xs font-bold text-neutral-600">
                  Featured Product
                </label>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary"
                />
              </div>

              {/* Active */}
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <label className="text-xs font-bold text-neutral-600">
                  Active
                </label>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Variants */}
        <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-50 rounded-lg">
                <Layers className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="text-lg font-display font-bold">Variants</h3>
            </div>
            <button
              type="button"
              onClick={addVariantOption}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Option
            </button>
          </div>

          <div className="space-y-4">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500 uppercase">
                      Option:
                    </span>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) =>
                        updateVariantName(variant.id, e.target.value)
                      }
                      className="bg-transparent border-none p-0 text-xs font-bold text-neutral-950 focus:ring-0 outline-none w-24"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVariantOption(variant.id)}
                    className="text-neutral-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {variant.values.map((value) => (
                    <span
                      key={value}
                      className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium flex items-center gap-2"
                    >
                      {value}
                      <X
                        onClick={() => removeVariantValue(variant.id, value)}
                        className="w-3 h-3 text-neutral-400 cursor-pointer hover:text-rose-500"
                      />
                    </span>
                  ))}

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add value..."
                      value={variantValueInput[variant.id] || ""}
                      onChange={(e) =>
                        setVariantValueInput({
                          ...variantValueInput,
                          [variant.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) =>
                        handleVariantValueKeyDown(e, variant.id)
                      }
                      className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-primary outline-none w-24"
                    />
                    <button
                      type="button"
                      onClick={() => addVariantValue(variant.id)}
                      className="p-1 text-primary hover:bg-primary-light rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {variants.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-neutral-100 rounded-xl">
                <p className="text-xs text-neutral-400">
                  No variants added yet. Add options like Size or Color.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-80 space-y-8">
        {/* Publish */}
        <section className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">
            Publish
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    formData.is_active ? "bg-emerald-500" : "bg-neutral-400"
                  }`}
                />
                <span className="text-xs font-medium text-neutral-600">
                  Status:
                </span>
              </div>
              <span className="text-xs font-bold text-neutral-950">
                {formData.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-600">
                  Featured:
                </span>
              </div>
              <span className="text-xs font-bold text-neutral-950">
                {formData.is_featured ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isLoading
                ? "Saving..."
                : mode === "edit"
                  ? "Update Product"
                  : "Save Product"}
            </button>
          </div>
        </section>

        {/* Media Upload */}
        <section className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">
              Product Media
            </h3>
            <span className="text-[10px] font-bold text-neutral-400 uppercase">
              {imageItems.filter((i) => !i.uploading).length} / 5
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Image previews */}
            {imageItems.map((item, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 group bg-neutral-50"
              >
                {item.uploading ? (
                  // Loading state
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="text-[10px] text-neutral-400">
                      Uploading...
                    </span>
                  </div>
                ) : (
                  // Image preview
                  <>
                    <Image
                      src={item.url}
                      alt={`Product ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    {/* Primary badge */}
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Primary
                      </span>
                    )}
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 p-1 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <X className="w-3 h-3 text-rose-500" />
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Upload button */}
            {imageItems.length < 5 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary-light/30 transition-all group cursor-pointer">
                <div className="p-2 bg-neutral-100 rounded-lg group-hover:bg-primary-light transition-colors">
                  <Upload className="w-5 h-5 text-neutral-400 group-hover:text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-neutral-400 group-hover:text-primary">
                    Upload Images
                  </p>
                  <p className="text-[9px] text-neutral-300 mt-0.5">
                    Up to {5 - imageItems.length} more
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}

            {/* Empty slots visual */}
            {imageItems.length === 0 && (
              <div className="col-span-2 py-8 border-2 border-dashed border-neutral-100 rounded-xl flex flex-col items-center gap-3">
                <div className="p-3 bg-neutral-100 rounded-xl">
                  <ImageIcon className="w-6 h-6 text-neutral-300" />
                </div>
                <p className="text-xs text-neutral-400 text-center">
                  No images yet.
                  <br />
                  Upload up to 5 product images.
                </p>
              </div>
            )}
          </div>

          {/* Helper text */}
          <p className="text-[10px] text-neutral-400">
            JPG, PNG, WEBP • Max 5MB each • First image is primary
          </p>
        </section>

        {/* Organization */}
        <section className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">
            Organization
          </h3>

          <div className="space-y-4">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                Tags
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Type and press Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-neutral-100 rounded-lg text-[10px] font-bold text-neutral-600 flex items-center gap-1"
                  >
                    {tag}
                    <X
                      onClick={() => removeTag(tag)}
                      className="w-2.5 h-2.5 cursor-pointer hover:text-rose-500"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
