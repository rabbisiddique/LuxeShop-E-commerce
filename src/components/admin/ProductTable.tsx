'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const products = [
  {
    id: 1,
    name: 'Classic Silk Blouse',
    category: 'Fashion',
    price: 120.00,
    stock: 45,
    status: 'Active',
    sku: 'LS-SB-001',
    rating: 4.8,
    image: 'https://picsum.photos/seed/silk/100/100',
  },
  {
    id: 2,
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 85.00,
    stock: 12,
    status: 'Low Stock',
    sku: 'LS-LB-042',
    rating: 4.5,
    image: 'https://picsum.photos/seed/bag/100/100',
  },
  {
    id: 3,
    name: 'Minimalist Gold Watch',
    category: 'Accessories',
    price: 250.00,
    stock: 0,
    status: 'Out of Stock',
    sku: 'LS-GW-015',
    rating: 4.9,
    image: 'https://picsum.photos/seed/watch/100/100',
  },
  {
    id: 4,
    name: 'Cashmere V-Neck Sweater',
    category: 'Fashion',
    price: 180.00,
    stock: 28,
    status: 'Active',
    sku: 'LS-CS-088',
    rating: 4.7,
    image: 'https://picsum.photos/seed/sweater/100/100',
  },
  {
    id: 5,
    name: 'Velvet Evening Gown',
    category: 'Fashion',
    price: 450.00,
    stock: 5,
    status: 'Draft',
    sku: 'LS-VG-012',
    rating: 0,
    image: 'https://picsum.photos/seed/gown/100/100',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Active': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Low Stock': 'bg-amber-50 text-amber-600 border-amber-100',
    'Out of Stock': 'bg-rose-50 text-rose-600 border-rose-100',
    'Draft': 'bg-neutral-100 text-neutral-500 border-neutral-200',
  };

  const icons: Record<string, any> = {
    'Active': CheckCircle2,
    'Low Stock': AlertCircle,
    'Out of Stock': AlertCircle,
    'Draft': Clock,
  };

  const Icon = icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status] || styles['Draft']}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

export default function ProductTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-neutral-950 text-white px-6 py-3 flex items-center justify-between overflow-hidden"
          >
            <span className="text-sm font-medium">{selectedProducts.length} products selected</span>
            <div className="flex items-center gap-4">
              <button className="text-sm font-bold hover:text-primary transition-colors">Update Status</button>
              <button className="text-sm font-bold hover:text-primary transition-colors">Duplicate</button>
              <button className="text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors">Delete Selected</button>
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
                    selectedProducts.length === products.length 
                      ? 'bg-primary border-primary' 
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {selectedProducts.length === products.length && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Category</th>
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
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => (
              <tr 
                key={product.id} 
                className={`group hover:bg-neutral-50/50 transition-colors ${selectedProducts.includes(product.id) ? 'bg-primary-light/30' : ''}`}
              >
                <td className="px-6 py-4">
                  <div 
                    onClick={() => toggleSelectProduct(product.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                      selectedProducts.includes(product.id) 
                        ? 'bg-primary border-primary' 
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {selectedProducts.includes(product.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-950 group-hover:text-primary transition-colors">{product.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-amber-500 font-bold">★ {product.rating}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-neutral-500">{product.sku}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">{product.category}</td>
                <td className="px-6 py-4 text-sm font-bold text-neutral-950">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm font-bold ${product.stock === 0 ? 'text-rose-600' : product.stock < 20 ? 'text-amber-600' : 'text-neutral-950'}`}>
                      {product.stock}
                    </span>
                    <div className="w-16 h-1 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${product.stock === 0 ? 'bg-rose-500' : product.stock < 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 lg:p-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
          Showing <span className="text-neutral-950">1-5</span> of <span className="text-neutral-950">124</span> products
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-neutral-200 rounded-lg text-neutral-400 hover:bg-neutral-50 transition-colors disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3, '...', 12].map((page, i) => (
            <button 
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                page === 1 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
