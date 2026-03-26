// src/components/admin/CustomerTable.tsx

"use client";

import {
  banCustomer,
  deleteCustomer,
} from "@/src/actions/admin/admin.customers";
import { useCustomers } from "@/src/hooks/useCustomers";
import {
  Award,
  CheckCircle2,
  Crown,
  Download,
  Eye,
  Gem,
  Loader2,
  Medal,
  MoreVertical,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";
import Pagination from "./Pagination";

export default function CustomerTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [banId, setBanId] = useState<string | null>(null);
  const [banStatus, setBanStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBanning, setIsBanning] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { customers, setCustomers, pagination, isLoading } = useCustomers({
    page,
    limit: 10,
    search,
    realtime: true,
  });

  // ─── Tier Badge ───────────────────────

  const TierBadge = ({ tier }: { tier: string }) => {
    const config: Record<
      string,
      {
        style: string;
        icon: React.ReactNode;
      }
    > = {
      platinum: {
        style: "bg-purple-50 text-purple-600 border-purple-100",
        icon: <Gem className="w-3 h-3 mr-1" />,
      },
      gold: {
        style: "bg-amber-50 text-amber-600 border-amber-100",
        icon: <Crown className="w-3 h-3 mr-1" />,
      },
      silver: {
        style: "bg-neutral-100 text-neutral-600 border-neutral-200",
        icon: <Medal className="w-3 h-3 mr-1" />,
      },
      bronze: {
        style: "bg-orange-50 text-orange-600 border-orange-100",
        icon: <Award className="w-3 h-3 mr-1" />,
      },
    };

    const current = config[tier] ?? config.bronze;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize ${current.style}`}
      >
        {current.icon}
        {tier}
      </span>
    );
  };

  // ─── Handle Ban ───────────────────────

  const handleBan = async () => {
    if (!banId) return;
    setIsBanning(true);

    const result = await banCustomer(banId, banStatus);

    if (result.success) {
      toast.success(result.message);

      // ✅ Manually update state
      // No realtime needed
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === banId
            ? {
                ...c,
                is_banned: banStatus,
                is_active: !banStatus,
              }
            : c,
        ),
      );
      setBanId(null);
    } else {
      toast.error(result.message);
    }

    setIsBanning(false);
  };

  // ─── Handle Delete ────────────────────

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    const result = await deleteCustomer(deleteId);

    if (result.success) {
      toast.success(result.message);

      // ✅ Manually remove from state
      setCustomers((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    } else {
      toast.error(result.message);
    }

    setIsDeleting(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 lg:p-6 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-neutral-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <button className="p-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-200">
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Joined
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
                      <span className="text-sm">Loading customers...</span>
                    </div>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <p className="text-sm text-neutral-400">
                      No customers found
                    </p>
                  </td>
                </tr>
              ) : (
                customers.map((customer: any) => (
                  <tr
                    key={customer.id}
                    className="group hover:bg-neutral-50/50 transition-colors"
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">
                            {customer.first_name?.[0] ??
                              customer.email?.[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-950">
                            {customer.full_name ??
                              customer.first_name ??
                              "No Name"}
                          </p>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="px-6 py-4">
                      <TierBadge tier={customer.loyalty_tier ?? "bronze"} />
                    </td>

                    {/* Orders */}
                    <td className="px-6 py-4 text-sm font-bold text-neutral-950">
                      {customer.total_orders ?? 0}
                    </td>

                    {/* Total Spent */}
                    <td className="px-6 py-4 text-sm font-bold text-neutral-950">
                      ${(customer.total_spent ?? 0).toFixed(2)}
                    </td>

                    {/* Points */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-primary">
                        {customer.loyalty_points ?? 0}
                      </span>
                      <span className="text-xs text-neutral-400 ml-1">pts</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {customer.is_banned ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border bg-rose-50 text-rose-600 border-rose-100">
                          <UserX className="w-3 h-3" />
                          Banned
                        </span>
                      ) : customer.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-600 border-emerald-100">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border bg-neutral-100 text-neutral-500 border-neutral-200">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {new Date(customer.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/customers/${customer.id}`}>
                          <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>

                        {/* More menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenu(
                                openMenu === customer.id ? null : customer.id,
                              )
                            }
                            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenu === customer.id && (
                            <div className="absolute right-0 top-10 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 w-44 py-1 overflow-hidden">
                              <button
                                onClick={() => {
                                  setBanId(customer.id);
                                  setBanStatus(
                                    !customer.is_active ? false : true,
                                  );
                                  setOpenMenu(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
                              >
                                {customer.is_active ? (
                                  <>
                                    <ShieldOff className="w-4 h-4 text-amber-500" />
                                    Ban Customer
                                  </>
                                ) : (
                                  <>
                                    <Shield className="w-4 h-4 text-emerald-500" />
                                    Unban Customer
                                  </>
                                )}
                              </button>
                              <div className="h-px bg-neutral-100 mx-2" />
                              <button
                                onClick={() => {
                                  setDeleteId(customer.id);
                                  setOpenMenu(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Customer
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* Ban Dialog */}
      <ConfirmDialog
        isOpen={!!banId}
        title={banStatus ? "Ban Customer" : "Unban Customer"}
        description={
          banStatus
            ? "This customer will lose access to their account immediately."
            : "This customer will regain full access to their account."
        }
        confirmLabel={banStatus ? "Ban Customer" : "Unban Customer"}
        isLoading={isBanning}
        onConfirm={handleBan}
        onCancel={() => setBanId(null)}
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Customer"
        description="This will permanently delete the customer and all their data. This action cannot be undone."
        confirmLabel="Delete Customer"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
