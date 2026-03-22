'use client';

import React, { useState } from 'react';
import { 
  Save, 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Info, 
  Eye, 
  Globe, 
  DollarSign, 
  Package, 
  Layers,
  Image as ImageIcon,
  Tag,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function ProductForm() {
  const [images, setImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('General');
  
  // Tags State
  const [tags, setTags] = useState<string[]>(['New Arrival', 'Summer']);
  const [tagInput, setTagInput] = useState('');

  // Variants State
  const [variants, setVariants] = useState([
    { id: 1, name: 'Size', values: ['Small', 'Medium', 'Large', 'XL'] }
  ]);
  const [variantValueInput, setVariantValueInput] = useState<{ [key: number]: string }>({});

  const tabs = ['General', 'Pricing', 'Inventory', 'Variants', 'SEO'];

  // Tag Handlers
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Variant Handlers
  const addVariantOption = () => {
    const newId = variants.length > 0 ? Math.max(...variants.map(v => v.id)) + 1 : 1;
    setVariants([...variants, { id: newId, name: 'New Option', values: [] }]);
  };

  const removeVariantOption = (id: number) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const updateVariantName = (id: number, name: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, name } : v));
  };

  const handleVariantValueKeyDown = (e: React.KeyboardEvent, variantId: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addVariantValue(variantId);
    }
  };

  const addVariantValue = (variantId: number) => {
    const value = variantValueInput[variantId]?.trim();
    if (value) {
      setVariants(variants.map(v => {
        if (v.id === variantId && !v.values.includes(value)) {
          return { ...v, values: [...v.values, value] };
        }
        return v;
      }));
      setVariantValueInput({ ...variantValueInput, [variantId]: '' });
    }
  };

  const removeVariantValue = (variantId: number, valueToRemove: string) => {
    setVariants(variants.map(v => {
      if (v.id === variantId) {
        return { ...v, values: v.values.filter(val => val !== valueToRemove) };
      }
      return v;
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form Sections */}
      <div className="flex-1 space-y-8">
        {/* Navigation Tabs (Mobile) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-primary text-white' : 'bg-white text-neutral-500 border border-neutral-200'
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
            <h3 className="text-lg font-display font-bold">Basic Information</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Classic Silk Blouse"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Description</label>
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200 flex items-center gap-4">
                  <button className="text-xs font-bold text-neutral-600 hover:text-primary transition-colors">B</button>
                  <button className="text-xs italic text-neutral-600 hover:text-primary transition-colors">I</button>
                  <button className="text-xs underline text-neutral-600 hover:text-primary transition-colors">U</button>
                  <div className="w-px h-4 bg-neutral-300"></div>
                  <button className="text-xs text-neutral-600 hover:text-primary transition-colors">Link</button>
                  <button className="text-xs text-neutral-600 hover:text-primary transition-colors">List</button>
                </div>
                <textarea 
                  rows={6}
                  placeholder="Describe your product in detail..."
                  className="w-full bg-white px-4 py-3 text-sm focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-display font-bold">Pricing</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Base Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Discount Price (Optional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-display font-bold">Inventory</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">SKU</label>
                <input 
                  type="text" 
                  placeholder="e.g. LS-SB-001"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Stock Quantity</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
              onClick={addVariantOption}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Option
            </button>
          </div>

          <div className="space-y-4">
            {variants.map((variant) => (
              <div key={variant.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Option:</span>
                    <input 
                      type="text"
                      value={variant.name}
                      onChange={(e) => updateVariantName(variant.id, e.target.value)}
                      className="bg-transparent border-none p-0 text-xs font-bold text-neutral-950 focus:ring-0 outline-none w-24"
                    />
                  </div>
                  <button 
                    onClick={() => removeVariantOption(variant.id)}
                    className="text-neutral-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variant.values.map((value) => (
                    <span key={value} className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium flex items-center gap-2">
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
                      value={variantValueInput[variant.id] || ''}
                      onChange={(e) => setVariantValueInput({ ...variantValueInput, [variant.id]: e.target.value })}
                      onKeyDown={(e) => handleVariantValueKeyDown(e, variant.id)}
                      className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-primary outline-none w-24"
                    />
                    <button 
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
                <p className="text-xs text-neutral-400">No variants added yet. Add options like Size or Color.</p>
              </div>
            )}
          </div>
        </section>

        {/* SEO */}
        <section className="bg-white p-6 lg:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-neutral-100 rounded-lg">
              <Globe className="w-5 h-5 text-neutral-600" />
            </div>
            <h3 className="text-lg font-display font-bold">Search Engine Optimization</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Meta Title</label>
              <input 
                type="text" 
                placeholder="Classic Silk Blouse | LuxeShop"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Meta Description</label>
              <textarea 
                rows={3}
                placeholder="Enter a brief description for search engines..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Media & Publishing */}
      <div className="w-full lg:w-80 space-y-8">
        {/* Publish Actions */}
        <section className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Publish</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-neutral-600">Status:</span>
              </div>
              <span className="text-xs font-bold text-neutral-950">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-600">Visibility:</span>
              </div>
              <span className="text-xs font-bold text-neutral-950">Public</span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save Product
            </button>
            <button className="w-full py-3 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </section>

        {/* Media Upload */}
        <section className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Product Media</h3>
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Max 5</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 group">
                <Image src={img} alt="Product" fill className="object-cover" />
                <button className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3 text-rose-500" />
                </button>
              </div>
            ))}
            <button className="aspect-square rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary-light transition-all group">
              <Upload className="w-5 h-5 text-neutral-400 group-hover:text-primary" />
              <span className="text-[10px] font-bold text-neutral-400 group-hover:text-primary">Upload</span>
            </button>
          </div>
        </section>

        {/* Organization */}
        <section className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Organization</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Category</label>
              <select className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                <option>Fashion</option>
                <option>Accessories</option>
                <option>Electronics</option>
                <option>Home & Living</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Tags</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-neutral-100 rounded-lg text-[10px] font-bold text-neutral-600 flex items-center gap-1">
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
