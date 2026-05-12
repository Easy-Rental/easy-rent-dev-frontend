import { useNavigate, useParams } from "react-router-dom";
import {
  MdEdit, MdArrowBack, MdDirectionsCar, MdLocationOn,
  MdStar, MdHandshake, MdOpenInNew, MdShield, MdArticle,
} from "react-icons/md";
import useGetVehicle from "hooks/vehicles/useGetVehicle";
import { STATUS_META } from "hooks/vehicles/_dummy";
import { DUMMY_PARTNERS } from "hooks/partners/_dummy";
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

const VehicleProfilePage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();

  const { vehicle, loading, error } = useGetVehicle(id);

  if (loading) return <Loading text="Loading vehicle..." />;
  if (error || !vehicle) return (
    <div className="flex items-center justify-center py-20 text-sm text-red-500">{error ?? "Vehicle not found."}</div>
  );

  const meta    = STATUS_META[vehicle.status] ?? STATUS_META.inactive;
  const partner = DUMMY_PARTNERS.find((p) => p.uid === vehicle.partner_uid);

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* ── Identity card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-start gap-4">

          {/* Vehicle icon / thumbnail */}
          <div className="flex-shrink-0">
            {vehicle.images?.[0]?.public_url ? (
              <img
                src={vehicle.images[0].public_url}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                <MdDirectionsCar size={28} className="text-brand-500" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {vehicle.brand} {vehicle.model} <span className="text-slate-400 font-normal">({vehicle.year})</span>
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{vehicle.plate_number}</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <MdLocationOn size={13} className="text-slate-400" />
                {vehicle.location || "—"}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-brand-50 text-brand-600 border-brand-200">
                <MdDirectionsCar size={11} /> {vehicle.category}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${meta.bg} ${meta.text} ${meta.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                {meta.label}
              </span>
              {vehicle.rating > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-yellow-50 text-yellow-600 border-yellow-200">
                  <MdStar size={11} /> {vehicle.rating} ({vehicle.reviews})
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button type="button"
              onClick={() => navigate(`/admin/fleet/${id}/edit`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg bg-brand-500 hover:bg-brand-600 text-xs font-medium text-white transition">
              <MdEdit size={13} /> Edit
            </button>
            <button type="button"
              onClick={() => navigate("/admin/fleet")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
              <MdArrowBack size={13} /> Back
            </button>
          </div>
        </div>
      </div>

      {/* ── Details card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">

        <Section title="Specifications">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
            <Field label="Brand"        value={vehicle.brand} />
            <Field label="Model"        value={vehicle.model} />
            <Field label="Year"         value={vehicle.year} />
            <Field label="Color"        value={vehicle.color} />
            <Field label="Transmission" value={vehicle.transmission} />
            <Field label="Fuel Type"    value={vehicle.fuel_type} />
            <Field label="Seats"        value={vehicle.seats ? `${vehicle.seats} seats` : null} />
            <Field label="Mileage"      value={vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : null} />
          </div>
        </Section>

        <Divider />

        <Section title="Pricing & Location">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Daily Rate"  value={vehicle.daily_rate ? `RM ${vehicle.daily_rate}/day` : null} />
            <Field label="Location"    value={vehicle.location} />
          </div>
        </Section>

        <Divider />

        <Section title="Documents">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
              <MdShield size={16} className="text-brand-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Insurance Expiry</p>
                <p className="text-sm font-medium text-slate-900">{vehicle.insurance_expiry || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
              <MdArticle size={16} className="text-brand-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Road Tax Expiry</p>
                <p className="text-sm font-medium text-slate-900">{vehicle.road_tax_expiry || "—"}</p>
              </div>
            </div>
          </div>
        </Section>

        {vehicle.features?.length > 0 && (
          <>
            <Divider />
            <Section title="Features">
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feat) => (
                  <span key={feat} className="px-2.5 py-1 rounded-md bg-brand-50 text-brand-600 border border-brand-100 text-xs font-medium">
                    {feat}
                  </span>
                ))}
              </div>
            </Section>
          </>
        )}

        {vehicle.description && (
          <>
            <Divider />
            <Section title="Description">
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{vehicle.description}</p>
            </Section>
          </>
        )}

        {partner && (
          <>
            <Divider />
            <Section title="Partner">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                  <MdHandshake size={16} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{partner.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{partner.role?.replace("_", " ")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/admin/partners/${partner.uid}`)}
                  className="ml-auto flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700 transition font-medium"
                >
                  View profile <MdOpenInNew size={12} />
                </button>
              </div>
            </Section>
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleProfilePage;
