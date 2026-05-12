import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdAdd, MdRefresh, MdEdit, MdDelete, MdWarning,
  MdFilterList, MdClose, MdDirectionsCar, MdLocationOn,
  MdStar, MdToggleOff,
} from "react-icons/md";
import useVehicles from "hooks/vehicles/useVehicles";
import useDeleteVehicle from "hooks/vehicles/useDeleteVehicle";
import { STATUS_META, VEHICLE_CATEGORIES } from "hooks/vehicles/_dummy";
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

const VehiclesPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { vehicles, count, loading, error, params, setParams, refetch } = useVehicles();
  const { deleteVehicle, loading: deleting } = useDeleteVehicle();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filtersOpen, setFiltersOpen]   = useState(false);

  const availableCount   = vehicles.filter((v) => v.status === "available").length;
  const rentedCount      = vehicles.filter((v) => v.status === "rented").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

  const activeFilterCount = [!!params.status, !!params.category].filter(Boolean).length;
  const hasAnyFilter      = activeFilterCount > 0 || !!params.search;

  const clearAllFilters = () => setParams({ status: undefined, category: undefined, search: undefined });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteVehicle(deleteTarget.uid);
    if (ok) {
      addToast(`${deleteTarget.brand} ${deleteTarget.model} has been deleted`, "success");
      setDeleteTarget(null);
      refetch();
    } else {
      addToast("Failed to delete vehicle. Please try again.", "error");
    }
  };

  const totalPages = Math.ceil(count / 10);

  const statusOptions = [
    { value: "available",   label: "Available"   },
    { value: "rented",      label: "Rented"      },
    { value: "maintenance", label: "Maintenance" },
    { value: "inactive",    label: "Inactive"    },
  ];

  const categoryOptions = VEHICLE_CATEGORIES.map((c) => ({ value: c, label: c }));

  return (
    <>
      <PageHeader
        title="Fleet Management"
        subtitle="Manage all vehicles available on the platform"
        actions={
          <Button
            variant="primary"
            text="Add Vehicle"
            icon={<MdAdd size={15} />}
            onClick={() => navigate("/admin/fleet/add")}
          />
        }
        className="mb-4 px-0 sm:px-0"
      />

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <StatCard icon={MdDirectionsCar} label="Total Vehicles" value={count}           accent />
        <StatCard icon={MdDirectionsCar} label="Available"      value={availableCount}  />
        <StatCard icon={MdDirectionsCar} label="Rented"         value={rentedCount}     />
        <StatCard icon={MdDirectionsCar} label="Maintenance"    value={maintenanceCount} />
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
            placeholder="Search brand, plate, location..."
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

          <div className="hidden sm:block">
            <FilterSelectField
              value={params.category ?? "all"}
              onChange={(val) => setParams({ category: val === "all" ? undefined : val })}
              icon={MdDirectionsCar}
              defaultOption="All Categories"
              options={categoryOptions}
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
              Showing <span className="font-semibold text-slate-600">{vehicles.length}</span> of <span className="font-semibold text-slate-600">{count}</span>
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
            <FilterSelectField
              value={params.category ?? "all"}
              onChange={(val) => setParams({ category: val === "all" ? undefined : val })}
              icon={MdDirectionsCar}
              defaultOption="All Categories"
              options={categoryOptions}
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
                  Showing <span className="font-semibold text-slate-600">{vehicles.length}</span> of <span className="font-semibold text-slate-600">{count}</span>
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
              <Loading text="Fetching vehicles..." />
            ) : error ? (
              <div className="flex items-center justify-center py-16 text-sm text-red-500">{error}</div>
            ) : vehicles.length === 0 ? (
              <EmptyState
                icon={<MdDirectionsCar size={28} />}
                title="No vehicles found"
                description="Try adjusting your search or filters."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      {["Vehicle", "Plate No.", "Location", "Status", "Price/Day", "Rating", "Actions"].map((label) => (
                        <th key={label} className="px-5 py-3 text-left text-xs font-bold tracking-widest uppercase text-slate-400">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {vehicles.map((v) => {
                      const meta = STATUS_META[v.status] ?? STATUS_META.inactive;
                      return (
                        <tr
                          key={v.uid}
                          onClick={() => navigate(`/admin/fleet/${v.uid}`)}
                          className="hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                                <MdDirectionsCar size={18} className="text-brand-500" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900 truncate">{v.brand} {v.model}</p>
                                <p className="text-xs text-slate-400">{v.year} · {v.category} · {v.seats} seats</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{v.plate_number}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="flex items-center gap-1 text-slate-500">
                              <MdLocationOn size={14} className="text-slate-400 shrink-0" />
                              <span className="truncate max-w-[120px]">{v.location}</span>
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${meta.bg} ${meta.text} ${meta.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                              {meta.label}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-semibold text-slate-900">RM {v.daily_rate}</span>
                            <span className="text-xs text-slate-400">/day</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="flex items-center gap-1">
                              <MdStar size={14} className="text-yellow-400" />
                              <span className="font-semibold text-slate-700">{v.rating}</span>
                              <span className="text-xs text-slate-400">({v.reviews})</span>
                            </span>
                          </td>
                          <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => navigate(`/admin/fleet/${v.uid}/edit`)}
                                className="p-1.5 rounded-md text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition"
                                title="Edit"
                              >
                                <MdEdit size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(v)}
                                className="p-1.5 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                                title="Delete"
                              >
                                <MdDelete size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
        title="Delete Vehicle"
        message={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">{deleteTarget?.brand} {deleteTarget?.model}</span>?
            {" "}This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        icon={<MdWarning size={20} className="text-red-500" />}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default VehiclesPage;
