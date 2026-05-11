import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import useGetPartner from "hooks/partners/useGetPartner";
import useUpdatePartner from "hooks/partners/useUpdatePartner";
import useUpdatePartnerProfile from "hooks/partners/useUpdatePartnerProfile";
import { useToast } from "context/ToastContext";
import InputField from "components/form/InputField";
import TextareaField from "components/form/TextareaField";
import SelectField from "components/form/SelectField";
import CompactToggle from "components/form/toggle/CompactToggle";
import Button from "components/ui/buttons/Button";
import PasswordField from "components/form/PasswordField";
import FileUploadField from "components/form/filesUpload/FileUploadField";
import Loading from "../../../components/loading/Loading";
import { COUNTRIES } from "constants/lists";
import SearchableSelect from "components/form/SearchableSelect";
import usePresignedUpload from "hooks/storage/usePresignedUpload";

// ── Avatar upload widget ───────────────────────────────────────────────────
const AvatarUpload = ({ displayUrl, name, onChange, onUploadError }) => {
  const { upload, uploading, progress, error, reset } = usePresignedUpload();
  const inputRef = useRef(null);

  const initials = name
    ? name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const result = await upload(file, { folder: "partners/profile-pictures", file_type: "image" });
    if (result) { onChange(result); reset(); }
    else { onUploadError?.("Failed to upload profile picture. Please try again."); }
  };

  return (
    <div className="flex flex-col items-center gap-3 py-6 border-b border-slate-100">
      <div className="relative group">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-100 focus:outline-none focus:ring-brand-200 transition"
          disabled={uploading}
        >
          {displayUrl ? (
            <img src={displayUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-2xl font-bold select-none">
              {initials}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full">
            <MdPhotoCamera size={22} className="text-white" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-0.5 right-0.5 w-7 h-7 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm transition"
        >
          <MdPhotoCamera size={12} />
        </button>
      </div>

      {uploading && (
        <div className="w-28 space-y-1">
          <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400 text-center">Uploading {progress}%</p>
        </div>
      )}

      {!uploading && (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="text-xs text-brand-500 hover:text-brand-700 transition font-medium">
          {displayUrl ? "Change photo" : "Upload photo"}
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
        className="hidden" onChange={handleChange} />
    </div>
  );
};

// ── Section label ─────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{children}</p>
);

// ── Page ──────────────────────────────────────────────────────────────────
const ROLES = [
  { value: "fleet_owner", label: "Fleet Owner"      },
  { value: "individual",  label: "Individual Owner" },
];

const PartnerEditPage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { user: partner, loading: loadingPartner, error: loadError, refetch } = useGetPartner(id);
  const { updatePartner, loading: updating, error: updateError, fieldErrors, profileFieldErrors, getLastError } = useUpdatePartner();
  const { updateProfile }                                          = useUpdatePartnerProfile();
  const { upload: uploadCvFile, uploading: uploadingCvFile }       = usePresignedUpload();

  const [cvFile, setCvFile] = useState(null);
  const cvBusy = uploadingCvFile;
  const isBusy = updating;

  const [form, setForm] = useState({
    name:      "",
    email:     "",
    password:  "",
    role:      "individual",
    is_active: true,
    profile_picture:  "",
    title:            "",
    bio:              "",
    years_experience: "",
    certifications:   "",
    linkedin_url:     "",
    primary_email:    "",
    secondary_email:  "",
    phone:            "",
    whatsapp:         "",
    address:          "",
    city:             "",
    country:          "",
    postal_code:      "",
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const set = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!partner) return;
    const p = partner.profile;
    setForm({
      name:      partner.name      ?? "",
      email:     partner.email     ?? "",
      password:  "",
      role:      partner.role      ?? "individual",
      is_active: partner.is_active ?? true,
      profile_picture:  "",
      title:            p?.title            ?? "",
      bio:              p?.bio              ?? "",
      years_experience: p?.years_experience != null ? String(p.years_experience) : "",
      certifications:   p?.certifications   ?? "",
      linkedin_url:     p?.linkedin_url     ?? "",
      primary_email:    p?.primary_email    ?? "",
      secondary_email:  p?.secondary_email  ?? "",
      phone:            p?.phone            ?? "",
      whatsapp:         p?.whatsapp         ?? "",
      address:          p?.address          ?? "",
      city:             p?.city             ?? "",
      country:          p?.country          ?? "",
      postal_code:      p?.postal_code      ?? "",
    });
    setProfilePictureUrl(p?.profile_picture?.public_url ?? "");
  }, [partner]);

  const handleCvChange = async (file) => {
    setCvFile(file);
    const uploaded = await uploadCvFile(file, { folder: "documents/partner-cvs", file_type: "pdf" });
    setCvFile(null);
    if (uploaded) {
      const result = await updateProfile(id, { cv: uploaded.file_key });
      if (result) { addToast("Document updated", "success"); refetch(); }
      else { addToast("Failed to update document. Please try again.", "error"); }
    } else {
      addToast("Failed to upload document. Please try again.", "error");
    }
  };

  const handleCvDelete = async () => {
    const result = await updateProfile(id, { cv: null });
    if (result) { addToast("Document removed", "success"); refetch(); }
    else { addToast("Failed to remove document. Please try again.", "error"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name:      form.name,
      email:     form.email,
      role:      form.role,
      is_active: form.is_active,
      profile: {
        title:            form.title            || undefined,
        bio:              form.bio              || undefined,
        years_experience: form.years_experience !== "" ? Number(form.years_experience) : null,
        certifications:   form.certifications   || undefined,
        linkedin_url:     form.linkedin_url     || undefined,
        primary_email:    form.primary_email    || undefined,
        secondary_email:  form.secondary_email  || undefined,
        phone:            form.phone            || undefined,
        whatsapp:         form.whatsapp         || undefined,
        address:          form.address          || undefined,
        city:             form.city             || undefined,
        country:          form.country          || undefined,
        postal_code:      form.postal_code      || undefined,
      },
    };
    if (form.password)        payload.password                = form.password;
    if (form.profile_picture) payload.profile.profile_picture = form.profile_picture;

    const result = await updatePartner(id, payload);

    if (result) {
      addToast("Partner updated successfully", "success");
      navigate("/admin/partners");
    } else {
      const { fieldErrors: fe, profileFieldErrors: pe, error: ge } = getLastError();
      const firstError =
        Object.values(fe)[0] ??
        Object.values(pe)[0] ??
        ge ??
        "Failed to save changes. Please try again.";
      addToast(firstError, "error");
    }
  };

  if (loadingPartner) return <Loading text="Loading partner..." />;

  if (loadError) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-500">
        {loadError}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Edit Partner</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Updating <span className="font-semibold text-brand-600">{partner?.name}</span>
          </p>
        </div>

        <AvatarUpload
          displayUrl={profilePictureUrl}
          name={form.name}
          onChange={({ file_key, public_url }) => {
            set("profile_picture", file_key);
            setProfilePictureUrl(public_url);
          }}
          onUploadError={(msg) => addToast(msg, "error")}
        />

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 space-y-6">

          {updateError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {updateError}
            </div>
          )}

          {/* Account */}
          <div className="space-y-4">
            <SectionLabel>Account</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" field="name" placeholder="John Doe" formData={form} errors={fieldErrors} updateFormData={set} />
              <InputField label="Login Email" field="email" type="email" placeholder="john@example.com" formData={form} errors={fieldErrors} updateFormData={set} />
              <SelectField label="Type" field="role" options={ROLES} formData={form} errors={fieldErrors} updateFormData={set} />
              <PasswordField label="Password" required={false} placeholder="••••••••" hint="Leave blank to keep current" formData={form} errors={fieldErrors} updateFormData={set} />
            </div>
            <CompactToggle label="Active" description="Account can log in and access the system" field="is_active" formData={form} errors={fieldErrors} updateFormData={set} />
          </div>

          {/* Professional */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Professional</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Title" field="title" placeholder="e.g. Fleet Manager" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <InputField label="Years of Experience" field="years_experience" type="number" placeholder="e.g. 5" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
            </div>
            <TextareaField label="Bio" field="bio" placeholder="Brief professional bio..." rows={3} formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
            <TextareaField label="Certifications" field="certifications" placeholder="List relevant certifications..." rows={3} formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
            <InputField label="LinkedIn URL" field="linkedin_url" type="url" placeholder="https://linkedin.com/in/..." formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
          </div>

          {/* Contact */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Contact</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Contact Email (Primary)" field="primary_email" type="email" placeholder="primary@example.com" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <InputField label="Contact Email (Secondary)" field="secondary_email" type="email" placeholder="secondary@example.com" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <InputField label="Phone" field="phone" placeholder="+60 12-345 6789" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <InputField label="WhatsApp" field="whatsapp" placeholder="+60 12-345 6789" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Address</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <InputField label="Street Address" field="address" placeholder="Street address" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              </div>
              <InputField label="City" field="city" placeholder="City" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <SearchableSelect label="Country" field="country" options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))} formData={form} errors={profileFieldErrors} updateFormData={set} placeholder="Select country..." />
              <InputField label="Postal Code" field="postal_code" placeholder="Postal code" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Documents</SectionLabel>
            <FileUploadField
              accept=".pdf,.doc,.docx"
              simpleFile={cvFile}
              onSimpleFileChange={handleCvChange}
              onSimpleRemove={() => setCvFile(null)}
              simpleUploading={cvBusy}
              existingFileUrl={partner?.profile?.cv?.public_url || null}
              existingFileName="Current Document"
              onExistingRemove={handleCvDelete}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-slate-100 pt-5">
            <Button text="Cancel" variant="ghost" onClick={() => navigate("/admin/partners")} className="flex-1 py-2.5" />
            <Button type="submit" variant="primary" text={isBusy ? "Saving..." : "Save Changes"} disabled={isBusy || !form.name.trim() || !form.email.trim()} className="flex-1 py-2.5" />
          </div>

        </form>
      </div>
    </div>
  );
};

export default PartnerEditPage;
