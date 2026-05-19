import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdPersonAdd, MdRefresh, MdEdit, MdDelete, MdWarning,
  MdFilterList, MdClose, MdSupervisedUserCircle, MdToggleOff,
} from "react-icons/md";
import useManagers from "hooks/managers/useManagers";
import useDeleteManager from "hooks/managers/useDeleteManager";
import { useToast } from "context/ToastContext";
import Loading from "../../../components/loading/Loading";
import EmptyState from "components/empty/empty";
import Button from "components/ui/buttons/Button";
import IconButton from "components/ui/buttons/IconButton";
import PageHeader from "components/ui/PageHeader";
import FilterSelectField from "components/form/filter/FilterSelectField";
import PrevButton from "components/ui/buttons/PrevButton";
import NextButton from "components/ui/buttons/NextButton";
import SearchInput from "components/form/SearchInput";
import ConfirmModal from "components/ui/modals/ConfirmModal";

const StatCard = ({ icon: Icon, label, value, accent = false }) => (
  <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm flex-1 min-w-0">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ? "bg-brand-50 border border-brand-200" : "bg-brand-50 border border-brand-100"}`}>
      <Icon size={18} className="text-brand-500" />
    </div>
    <div className="min-w-0">
      <p className={`text-2xl font-extrabold tabular-nums leading-none ${accent ? "text-brand-500" : "text-brand-600"}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium">{label}</p>
    </div>
  </div>
);

const Avatar = ({ manager }) => {
  const initials = manager.name
    ? manager.name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  return manager.profile?.profile_picture?.public_url ? (
    <img src={manager.profile.profile_picture.public_url} alt={manager.name}
      className="w-8 h-8 rounded-full object-cover border border-slate-100 flex-shrink-0" />
  ) : (
    <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 select-none">
      {initials}
    </div>
  );
};

const ManagersPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { managers, count, loading, error, params, setParams, refetch } = useManagers();
  const { deleteManager, loading: deleting } = useDeleteManager();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filtersOpen, setFiltersOpen]   = useState(false);

  const activeCount   = managers.filter((m) =>  m.is_active).length;
  const inactiveCount = managers.filter((m) => !m.is_active).length;

  const activeFilterCount = [!!params.status].filter(Boolean).length;
  const hasAnyFilter      = activeFilterCount > 0 || !!params.search;

  const clearAllFilters = () => setParams({ status: undefined, search: undefined });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteManager(deleteTarget.uid);
    if (ok) {
      addToast(`${deleteTarget.name} has been removed`, "success");
      setDeleteTarget(null);
      refetch();
    } else {
      addToast("Failed to delete manager. Please try again.", "error");
    }
  };

  const totalPages = Math.ceil(count / 10);

  const statusOptions = [
    { value: "active",   label: "Active"   },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <>
      <PageHeader
        title="Account Managers"
        subtitle="Manage staff with account manager access"
        actions={
          <Button
            variant="primary"
            text="Add Manager"
            icon={<MdPersonAdd size={15} />}
            onClick={() => navigate("/admin/managers/create")}
          />
        }
        className="mb-4 px-0 sm:px-0"
      />

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <StatCard icon={MdSupervisedUserCircle} label="Total Managers"   value={count}        accent />
        <StatCard icon={MdSupervisedUserCircle} label="Active"           value={activeCount}  />
        <StatCard icon={MdSupervisedUserCircle} label="Inactive"         value={inactiveCount} />
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-slate-100 rounded-xl px-4 py-3 mb-4">
        <div className="flex items-center gap-2">

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <MdFilterList size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-600">Filters</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>

          <div className="hidden sm:block w-px h-5 bg-slate-200" />

          <SearchInput
            value={params.search ?? ""}
            onChange={(val) => setParams({ search: val })}
            placeholder="Search name, email, department..."
            className="flex-1 max-w-xs"
          />

          <div className="hidden sm:block">
            <FilterSelectField
              value={params.status ?? "all"}
              onChange={(val) => setParams({ status: val === "all" ? undefined : val })}
              icon={MdToggleOff}
              defaultOption="All Status"
              options={statusOptions}
            />
          </div>

          <div className="hidden sm:block w-px h-5 bg-slate-200" />

          <IconButton
            onClick={refetch}
            icon={<MdRefresh size={15} />}
            bgColor="bg-white"
            textColor="text-slate-500"
            borderColor="border-slate-200"
            hoverTextColor="hover:text-slate-700"
            hoverBorderColor="hover:border-slate-300"
            className="hidden sm:flex p-2 flex-shrink-0"
          />

          {hasAnyFilter && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition whitespace-nowrap flex-shrink-0"
            >
              <MdClose size={12} />
              Clear all
            </button>
          )}

          <div className="flex-1 hidden sm:block" />
          {!loading && (
            <span className="hidden sm:block text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
              Showing <span className="font-semibold text-slate-600">{managers.length}</span> of <span className="font-semibold text-slate-600">{count}</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className="relative sm:hidden flex-shrink-0 p-2 rounded-md border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 transition"
          >
            <MdFilterList size={16} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {filtersOpen && (
          <div className="sm:hidden mt-2 pt-2 border-t border-slate-100 flex flex-col gap-2">
            <FilterSelectField
              value={params.status ?? "all"}
              onChange={(val) => setParams({ status: val === "all" ? undefined : val })}
              icon={MdToggleOff}
              defaultOption="All Status"
              options={statusOptions}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={refetch}
                  icon={<MdRefresh size={14} />}
                  bgColor="bg-white"
                  textColor="text-slate-500"
                  borderColor="border-slate-200"
                  hoverTextColor="hover:text-slate-700"
                  hoverBorderColor="hover:border-slate-300"
                  className="p-2"
                />
                {hasAnyFilter && (
                  <button type="button" onClick={clearAllFilters} className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition">
                    <MdClose size={12} /> Clear all
                  </button>
                )}
              </div>
              {!loading && (
                <span className="text-xs text-slate-400">
                  Showing <span className="font-semibold text-slate-600">{managers.length}</span> of <span className="font-semibold text-slate-600">{count}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="p-4 sm:p-6">
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            {loading ? (
              <Loading text="Fetching managers..." />
            ) : error ? (
              <div className="flex items-center justify-center py-16 text-sm text-red-500">{error}</div>
            ) : managers.length === 0 ? (
              <EmptyState
                icon={<MdSupervisedUserCircle size={28} />}
                title="No managers found"
                description="Try adjusting your search or filters."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      {["Name", "Department", "Area", "Phone", "Status", "Actions"].map((label) => (
                        <th key={label} className="px-5 py-3 text-left text-xs font-bold tracking-widest uppercase text-slate-400">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {managers.map((m) => (
                      <tr
                        key={m.uid}
                        onClick={() => navigate(`/admin/managers/${m.uid}`)}
                        className="hover:bg-slate-50 transition cursor-pointer group"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar manager={m} />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate">{m.name}</p>
                              <p className="text-xs text-slate-400 truncate">{m.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">
                          {m.profile?.department ?? "—"}
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 max-w-[140px] truncate">
                          {m.profile?.assigned_area ?? "—"}
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">
                          {m.profile?.phone ?? "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                            m.is_active
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-slate-50 text-slate-400 border-slate-200"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${m.is_active ? "bg-green-500" : "bg-slate-300"}`} />
                            {m.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => navigate(`/admin/managers/${m.uid}/edit`)}
                              className="p-1.5 rounded-md text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition"
                              title="Edit"
                            >
                              <MdEdit size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(m)}
                              className="p-1.5 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                              title="Delete"
                            >
                              <MdDelete size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-slate-100">
                <p className="text-xs text-slate-400">Page {params.page ?? 1} of {totalPages}</p>
                <div className="flex gap-2">
                  <PrevButton text="Previous" disabled={!params.page || params.page <= 1} onClick={() => setParams({ page: (params.page ?? 1) - 1 })} />
                  <NextButton text="Next" disabled={(params.page ?? 1) >= totalPages} onClick={() => setParams({ page: (params.page ?? 1) + 1 })} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Remove Manager"
        message={
          <>
            Are you sure you want to remove{" "}
            <span className="font-semibold text-slate-900">{deleteTarget?.name}</span>?
            {" "}This action cannot be undone.
          </>
        }
        confirmText="Remove"
        cancelText="Cancel"
        loading={deleting}
        icon={<MdWarning size={20} className="text-red-500" />}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ManagersPage;
