import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import useGetManager from "hooks/managers/useGetManager";
import useUpdateManager from "hooks/managers/useUpdateManager";
import usePresignedUpload from "hooks/storage/usePresignedUpload";
import { useToast } from "context/ToastContext";
import InputField from "components/form/InputField";
import TextareaField from "components/form/TextareaField";
import SelectField from "components/form/SelectField";
import SearchableSelect from "components/form/SearchableSelect";
import CompactToggle from "components/form/toggle/CompactToggle";
import PasswordField from "components/form/PasswordField";
import Button from "components/ui/buttons/Button";
import Loading from "../../../components/loading/Loading";
import { MANAGER_DEPARTMENTS } from "hooks/managers/_dummy";
import { COUNTRIES } from "constants/lists";

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{children}</p>
);

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
    const result = await upload(file, { folder: "managers/profile-pictures", file_type: "image" });
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

const ManagerEditPage = () => {
  const { uid } = useParams(); const id = uid;
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { manager, loading: loadingManager, error: loadError } = useGetManager(id);
  const { updateManager, loading: updating, error: updateError, fieldErrors, profileFieldErrors, getLastError } = useUpdateManager();

  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [form, setForm] = useState({
    name:             "",
    email:            "",
    password:         "",
    is_active:        true,
    profile_picture:  "",
    title:            "",
    department:       "",
    assigned_area:    "",
    bio:              "",
    years_experience: "",
    phone:            "",
    whatsapp:         "",
    city:             "",
    country:          "",
  });

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  useEffect(() => {
    if (!manager) return;
    const p = manager.profile;
    setForm({
      name:             manager.name      ?? "",
      email:            manager.email     ?? "",
      password:         "",
      is_active:        manager.is_active ?? true,
      profile_picture:  "",
      title:            p?.title            ?? "",
      department:       p?.department       ?? "",
      assigned_area:    p?.assigned_area    ?? "",
      bio:              p?.bio              ?? "",
      years_experience: p?.years_experience != null ? String(p.years_experience) : "",
      phone:            p?.phone            ?? "",
      whatsapp:         p?.whatsapp         ?? "",
      city:             p?.city             ?? "",
      country:          p?.country          ?? "",
    });
    setProfilePictureUrl(p?.profile_picture?.public_url ?? "");
  }, [manager]);

  const deptOptions = MANAGER_DEPARTMENTS.map((d) => ({ value: d, label: d }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name:      form.name,
      email:     form.email,
      is_active: form.is_active,
      profile: {
        title:            form.title            || undefined,
        department:       form.department       || undefined,
        assigned_area:    form.assigned_area    || undefined,
        bio:              form.bio              || undefined,
        years_experience: form.years_experience !== "" ? Number(form.years_experience) : null,
        phone:            form.phone            || undefined,
        whatsapp:         form.whatsapp         || undefined,
        city:             form.city             || undefined,
        country:          form.country          || undefined,
      },
    };
    if (form.password)        payload.password               = form.password;
    if (form.profile_picture) payload.profile.profile_picture = form.profile_picture;

    const result = await updateManager(id, payload);
    if (result) {
      addToast("Manager updated successfully", "success");
      navigate(`/admin/managers/${id}`);
    } else {
      const { fieldErrors: fe, profileFieldErrors: pe, error: ge } = getLastError();
      const firstError =
        Object.values(fe)[0] ?? Object.values(pe)[0] ?? ge ?? "Failed to save changes. Please try again.";
      addToast(firstError, "error");
    }
  };

  if (loadingManager) return <Loading text="Loading manager..." />;
  if (loadError) return (
    <div className="flex items-center justify-center py-20 text-sm text-red-500">{loadError}</div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Edit Manager</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Updating <span className="font-semibold text-brand-600">{manager?.name}</span>
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
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{updateError}</div>
          )}

          {/* Account */}
          <div className="space-y-4">
            <SectionLabel>Account</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" field="name" placeholder="Full name" formData={form} errors={fieldErrors} updateFormData={set} />
              <InputField label="Login Email" field="email" type="email" placeholder="email@jomdrivo.com" formData={form} errors={fieldErrors} updateFormData={set} />
              <PasswordField label="Password" required={false} placeholder="••••••••" hint="Leave blank to keep current" formData={form} errors={fieldErrors} updateFormData={set} />
            </div>
            <CompactToggle label="Active" description="Account can log in and access the system" field="is_active" formData={form} errors={fieldErrors} updateFormData={set} />
          </div>

          {/* Assignment */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Assignment</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Title" field="title" placeholder="e.g. Senior Account Manager" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <SelectField label="Department" field="department" placeholder="Select department" options={deptOptions} formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <div className="sm:col-span-2">
                <InputField label="Assigned Area" field="assigned_area" placeholder="e.g. Kuala Lumpur & Selangor" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              </div>
            </div>
          </div>

          {/* Professional */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Professional</SectionLabel>
            <InputField label="Years of Experience" field="years_experience" type="number" placeholder="e.g. 3" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
            <TextareaField label="Bio" field="bio" placeholder="Brief professional bio..." rows={3} formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
          </div>

          {/* Contact */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <SectionLabel>Contact</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Phone" field="phone" placeholder="+60 11-234 5678" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <InputField label="WhatsApp" field="whatsapp" placeholder="+60 11-234 5678" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <InputField label="City" field="city" placeholder="City" formData={form} errors={profileFieldErrors} updateFormData={set} required={false} />
              <SearchableSelect label="Country" field="country" options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))} formData={form} errors={profileFieldErrors} updateFormData={set} placeholder="Select country..." />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-slate-100 pt-5">
            <Button text="Cancel" variant="ghost" onClick={() => navigate(`/admin/managers/${id}`)} className="flex-1 py-2.5" />
            <Button type="submit" variant="primary" text={updating ? "Saving..." : "Save Changes"} disabled={updating || !form.name.trim() || !form.email.trim()} className="flex-1 py-2.5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerEditPage;
