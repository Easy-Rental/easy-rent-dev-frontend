import { useNavigate, useParams } from "react-router-dom";
import {
  MdEdit, MdArrowBack, MdBrandingWatermark, MdPublic,
  MdOutlineDirectionsCar, MdOpenInNew,
} from "react-icons/md";
import useGetBrand from "hooks/brands/useGetBrand";
import Loading from "../../../components/loading/Loading";

const Field = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs text-slate-400">{label}</p>
    <div className="text-sm font-medium text-slate-900 break-words">{value ?? "—"}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <p className="text-sm font-semibold text-slate-900 mb-4">{title}</p>
    {children}
  </div>
);

const Divider = () => <div className="border-t border-slate-100 my-6" />;

const BrandProfilePage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();

  const { brand, loading, error } = useGetBrand(id);

  if (loading) return <Loading text="Loading brand..." />;
  if (error || !brand) return (
    <div className="flex items-center justify-center py-20 text-sm text-red-500">{error ?? "Brand not found."}</div>
  );

  const initial = brand.name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* ── Identity card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-start gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            {brand.logo?.public_url ? (
              <img src={brand.logo.public_url} alt={brand.name}
                className="w-16 h-16 rounded-2xl object-contain bg-slate-50 border border-slate-100" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-2xl font-bold select-none">
                {initial}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{brand.name}</h1>
            <div className="flex items-center gap-1 mt-1">
              <MdPublic size={13} className="text-slate-400" />
              <p className="text-sm text-slate-400">{brand.country_of_origin || "—"}</p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-brand-50 text-brand-600 border-brand-200">
                <MdBrandingWatermark size={11} /> Brand
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${
                brand.is_active
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${brand.is_active ? "bg-green-500" : "bg-red-400"}`} />
                {brand.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button type="button"
              onClick={() => navigate(`/admin/brands/${id}/edit`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg bg-brand-500 hover:bg-brand-600 text-xs font-medium text-white transition">
              <MdEdit size={13} /> Edit
            </button>
            <button type="button"
              onClick={() => navigate("/admin/brands")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
              <MdArrowBack size={13} /> Back
            </button>
          </div>
        </div>
      </div>

      {/* ── Details card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">

        <Section title="Brand Details">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Brand Name"        value={brand.name} />
            <Field label="Country of Origin" value={brand.country_of_origin} />
          </div>
          {brand.description && (
            <div className="mt-5">
              <Field label="Description"
                value={<span className="whitespace-pre-wrap font-normal text-slate-600">{brand.description}</span>} />
            </div>
          )}
        </Section>

        <Divider />

        <Section title="Fleet">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
              <MdOutlineDirectionsCar size={16} className="text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{brand.vehicle_count ?? 0} Vehicles</p>
              <p className="text-xs text-slate-400">Total vehicles registered under this brand</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/fleet")}
              className="ml-auto flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700 transition font-medium"
            >
              View fleet <MdOpenInNew size={12} />
            </button>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default BrandProfilePage;
