import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit, MdBusinessCenter, MdVerified, MdOpenInNew, MdArrowBack, MdPhotoCamera } from "react-icons/md";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";
import useGetPartner from "hooks/partners/useGetPartner";
import useUpdatePartnerProfile from "hooks/partners/useUpdatePartnerProfile";
import usePresignedUpload from "hooks/storage/usePresignedUpload";
import Loading from "../../../components/loading/Loading";
import { useToast } from "context/ToastContext";

const roleBadgeStyle = {
  fleet_owner: "bg-brand-50 text-brand-600 border-brand-200",
  individual:  "bg-slate-100 text-slate-600 border-slate-200",
  driver:      "bg-green-50 text-green-700 border-green-200",
};
const roleLabel = {
  fleet_owner: "Fleet Owner",
  individual:  "Individual Owner",
  driver:      "Driver",
};

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

const PartnerProfilePage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { user: partner, loading, error, refetch } = useGetPartner(id);
  const { updateProfile }                          = useUpdatePartnerProfile();
  const { upload, uploading, progress }            = usePresignedUpload();
  const { addToast }                               = useToast();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !partner) return;
    e.target.value = "";
    const result = await upload(file, { folder: "partners/profile-pictures", file_type: "image" });
    if (result) {
      const updated = await updateProfile(partner.uid, { profile_picture: result.file_key });
      if (updated) {
        addToast("Profile picture updated", "success");
        refetch();
      } else {
        addToast("Failed to update profile picture. Please try again.", "error");
      }
    } else {
      addToast("Failed to upload profile picture. Please try again.", "error");
    }
  };

  if (loading) return <Loading text="Loading profile..." />;
  if (error || !partner) return (
    <div className="flex items-center justify-center py-20 text-sm text-red-500">{error ?? "Partner not found."}</div>
  );

  const p = partner.profile;
  const initials = partner.name
    ? partner.name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : partner.email?.[0]?.toUpperCase() ?? "?";
  const location = [p?.city, p?.country].filter(Boolean).join(", ");

  const hasProfessional = p && (p.title || p.bio || p.years_experience != null || p.certifications || p.linkedin_url);
  const hasContact      = p && (p.primary_email || p.secondary_email || p.phone || p.whatsapp);
  const hasAddress      = p && (p.address || p.city || p.country || p.postal_code);

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* ── Identity card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-start gap-4">

          {/* Avatar — clickable upload */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="relative group block w-16 h-16 rounded-full ring-4 ring-slate-100 focus:outline-none"
            >
              {p?.profile_picture?.public_url ? (
                <img src={p.profile_picture.public_url} alt={partner.name}
                  className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-500 text-white flex items-center justify-center text-xl font-bold select-none">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <MdPhotoCamera size={18} className="text-white" />
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{progress}%</span>
                </div>
              )}
            </button>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
              className="hidden" onChange={handleAvatarChange} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{partner.name || "—"}</h1>
            {p?.title && <p className="text-sm text-slate-500 mt-0.5">{p.title}</p>}
            <p className="text-sm text-slate-400 mt-0.5 truncate">{partner.email}</p>
            {location && <p className="text-xs text-slate-400 mt-0.5">{location}</p>}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${roleBadgeStyle[partner.role] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}>
                <MdBusinessCenter size={11} />
                {roleLabel[partner.role] ?? partner.role}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${
                partner.is_active
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${partner.is_active ? "bg-green-500" : "bg-red-400"}`} />
                {partner.is_active ? "Active" : "Inactive"}
              </span>
              {partner.is_superuser && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  <MdVerified size={11} /> Verified
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button type="button"
              onClick={() => navigate(`/admin/partners/${id}/edit`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg bg-brand-500 hover:bg-brand-600 text-xs font-medium text-white transition">
              <MdEdit size={13} /> Edit
            </button>
            <button type="button"
              onClick={() => navigate("/admin/partners")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md lg:rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
              <MdArrowBack size={13} /> Back
            </button>
          </div>
        </div>
      </div>

      {/* ── Details card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">

        {/* Account */}
        <Section title="Account">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Full Name" value={partner.name} />
            <Field label="Email"     value={partner.email} />
          </div>
        </Section>

        {hasProfessional && (
          <>
            <Divider />
            <Section title="Professional">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {p.title && <Field label="Title" value={p.title} />}
                {p.years_experience != null && (
                  <Field label="Experience" value={`${p.years_experience} year${p.years_experience !== 1 ? "s" : ""}`} />
                )}
                {p.linkedin_url && (
                  <Field label="LinkedIn" value={
                    <a href={p.linkedin_url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition">
                      <FaLinkedin size={12} className="text-[#0077b5]" /> LinkedIn <MdOpenInNew size={11} className="text-slate-400" />
                    </a>
                  } />
                )}
              </div>
              {p.bio && (
                <div className="mt-5">
                  <Field label="Bio" value={<span className="whitespace-pre-wrap font-normal text-slate-600">{p.bio}</span>} />
                </div>
              )}
              {p.certifications && (
                <div className="mt-5">
                  <Field label="Certifications" value={<span className="whitespace-pre-wrap font-normal text-slate-600">{p.certifications}</span>} />
                </div>
              )}
            </Section>
          </>
        )}

        {hasContact && (
          <>
            <Divider />
            <Section title="Contact">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {p.primary_email   && <Field label="Primary Email"   value={p.primary_email} />}
                {p.secondary_email && <Field label="Secondary Email" value={p.secondary_email} />}
                {p.phone           && <Field label="Phone"           value={p.phone} />}
                {p.whatsapp        && (
                  <Field label="WhatsApp" value={
                    <span className="inline-flex items-center gap-1.5 font-normal">
                      <FaWhatsapp size={13} className="text-green-500 flex-shrink-0" />
                      {p.whatsapp}
                    </span>
                  } />
                )}
              </div>
            </Section>
          </>
        )}

        {hasAddress && (
          <>
            <Divider />
            <Section title="Address">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {p.country     && <Field label="Country"     value={p.country} />}
                {p.city        && <Field label="City"        value={p.city} />}
                {p.address     && <Field label="Street"      value={p.address} />}
                {p.postal_code && <Field label="Postal Code" value={p.postal_code} />}
              </div>
            </Section>
          </>
        )}

        {p?.cv?.public_url && (
          <>
            <Divider />
            <Section title="Documents">
              <Field label="CV / Resume" value={
                <a href={p.cv.public_url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition">
                  <MdOpenInNew size={12} className="text-slate-400" /> View CV
                </a>
              } />
            </Section>
          </>
        )}

      </div>
    </div>
  );
};

export default PartnerProfilePage;
