import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdEdit, MdArrowBack, MdSupervisedUserCircle, MdVerified, MdPhotoCamera,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import useGetManager from "hooks/managers/useGetManager";
import usePresignedUpload from "hooks/storage/usePresignedUpload";
import { useToast } from "context/ToastContext";
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

const ManagerProfilePage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { manager, loading, error, refetch } = useGetManager(id);
  const { upload, uploading, progress }      = usePresignedUpload();
  const { addToast }                         = useToast();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !manager) return;
    e.target.value = "";
    const result = await upload(file, { folder: "managers/profile-pictures", file_type: "image" });
    if (result) {
      addToast("Profile picture updated", "success");
      refetch();
    } else {
      addToast("Failed to upload. Please try again.", "error");
    }
  };

  if (loading) return <Loading text="Loading profile..." />;
  if (error || !manager) return (
    <div className="flex items-center justify-center py-20 text-sm text-red-500">{error ?? "Manager not found."}</div>
  );

  const p        = manager.profile;
  const initials = manager.name
    ? manager.name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  const location = [p?.city, p?.country].filter(Boolean).join(", ");

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* ── Identity card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-start gap-4">

          {/* Avatar */}
          <div className="relative flex-shrink-0 group">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-slate-100 focus:outline-none focus:ring-brand-200 transition"
              disabled={uploading}
            >
              {p?.profile_picture?.public_url ? (
                <img src={p.profile_picture.public_url} alt={manager.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-xl font-bold select-none">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full">
                <MdPhotoCamera size={18} className="text-white" />
              </div>
            </button>
            {uploading && (
              <div className="absolute -bottom-5 left-0 right-0 text-center text-[10px] text-slate-400">
                {progress}%
              </div>
            )}
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
              className="hidden" onChange={handleAvatarChange} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{manager.name}</h1>
            {p?.title && <p className="text-sm text-slate-400 mt-0.5">{p.title}</p>}
            {location && <p className="text-xs text-slate-400 mt-0.5">{location}</p>}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-slate-100 text-slate-600 border-slate-200">
                <MdSupervisedUserCircle size={11} /> Account Manager
              </span>
              {manager.is_active && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-green-50 text-green-700 border-green-200">
                  <MdVerified size={11} /> Active
                </span>
              )}
              {!manager.is_active && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-red-50 text-red-600 border-red-200">
                  Inactive
                </span>
              )}
              {p?.department && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border bg-brand-50 text-brand-600 border-brand-200">
                  {p.department}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button type="button"
              onClick={() => navigate(`/admin/managers/${id}/edit`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg bg-brand-500 hover:bg-brand-600 text-xs font-medium text-white transition">
              <MdEdit size={13} /> Edit
            </button>
            <button type="button"
              onClick={() => navigate("/admin/managers")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
              <MdArrowBack size={13} /> Back
            </button>
          </div>
        </div>
      </div>

      {/* ── Details card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">

        <Section title="Account">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Email"  value={manager.email} />
            <Field label="Status" value={manager.is_active ? "Active" : "Inactive"} />
          </div>
        </Section>

        <Divider />

        <Section title="Assignment">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Department"    value={p?.department} />
            <Field label="Assigned Area" value={p?.assigned_area} />
            <Field label="Title"         value={p?.title} />
            <Field label="Experience"    value={p?.years_experience != null ? `${p.years_experience} years` : null} />
          </div>
          {p?.bio && (
            <div className="mt-5">
              <Field label="Bio" value={<span className="whitespace-pre-wrap font-normal text-slate-600">{p.bio}</span>} />
            </div>
          )}
        </Section>

        <Divider />

        <Section title="Contact">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Phone" value={p?.phone} />
            <Field
              label="WhatsApp"
              value={p?.whatsapp ? (
                <a
                  href={`https://wa.me/${p.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-green-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaWhatsapp size={13} /> {p.whatsapp}
                </a>
              ) : null}
            />
            <Field label="City"    value={p?.city} />
            <Field label="Country" value={p?.country} />
          </div>
        </Section>

      </div>
    </div>
  );
};

export default ManagerProfilePage;
