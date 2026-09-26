import React, { useEffect, useState } from "react";
import Input from "./input.jsx";
import Select, { Option } from "./select.jsx";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const asChoice = (v) => (v === true || v === "true" ? "true" : v === false || v === "false" ? "false" : "");

const YesNo = ({ title, id, value, onChange }) => (
  <Select title={title} id={id} value={value} onChange={onChange} required>
    <Option value="">Select</Option>
    <Option value="true">Yes</Option>
    <Option value="false">No</Option>
  </Select>
);

// Shared by Add Hotel and Edit Hotel. Calls onSubmit(FormData); the image is required only when adding.
export default function HotelForm({ initial = {}, requireImage = true, submitLabel, busy, onSubmit }) {
  const [details, setDetails] = useState({
    name: initial.name ?? "",
    area: initial.area ?? "",
    city: initial.city ?? "",
    state: initial.state ?? "",
    price: initial.price ?? "",
    unmarriedFriendly: asChoice(initial.unmarriedFriendly),
    image: null,
    AcRoomA: asChoice(initial.AcRoomA),
    NonAcRoomA: asChoice(initial.NonAcRoomA),
    TotalAc: initial.TotalAc ?? "",
    TotalNonAc: initial.TotalNonAc ?? "",
  });
  const [preview, setPreview] = useState(initial.Image || "");

  useEffect(() => {
    if (!details.image) return undefined;
    const url = URL.createObjectURL(details.image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [details.image]);

  function handleChange(type, e) {
    setDetails({
      ...details,
      [type]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", details.name);
    formData.append("area", details.area);
    formData.append("city", details.city);
    formData.append("state", details.state);
    formData.append("price", details.price);
    formData.append("unmarriedFriendly", details.unmarriedFriendly);
    if (details.image) formData.append("file", details.image);
    formData.append("AcRoomA", details.AcRoomA);
    formData.append("NonAcRoomA", details.NonAcRoomA);
    formData.append("TotalAc", details.TotalAc);
    formData.append("TotalNonAc", details.TotalNonAc);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-8 p-6 animate-fade-up md:p-8 lg:grid-cols-[1fr_1.4fr]">
      {/* Photo */}
      <div className="flex flex-col gap-3">
        <span className="field-label">Hotel photo</span>
        <label
          htmlFor="image"
          className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-surface2/60 transition hover:border-brass"
        >
          {preview ? (
            <img src={preview} alt="Hotel preview" className="h-full w-full object-cover" />
          ) : (
            <span className="px-6 text-center text-sm text-muted">
              <span className="block font-display text-lg text-ink">Upload a photo</span>
              JPG, PNG, WEBP or AVIF, up to 5 MB
            </span>
          )}
          {preview && (
            <span className="absolute bottom-3 right-3 rounded-full bg-bg/90 px-3 py-1 text-xs font-semibold text-ink opacity-0 transition group-hover:opacity-100">
              Change photo
            </span>
          )}
        </label>
        <input
          type="file"
          id="image"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required={requireImage}
          className="sr-only"
          onChange={(e) => {
            setDetails({ ...details, image: e.target.files[0] || null });
          }}
        />
        {!requireImage && <p className="text-xs text-muted">Leave it as is to keep the current photo.</p>}
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input type="text" placeholder="The Grand Palace" name="Name" id="name" value={details.name} onChange={(e) => handleChange("name", e)} className="sm:col-span-2" />
        <Input type="text" placeholder="Sector 17" name="Area" id="area" value={details.area} onChange={(e) => handleChange("area", e)} />
        <Input type="text" placeholder="Chandigarh" name="City" id="city" value={details.city} onChange={(e) => handleChange("city", e)} />
        <Select title="State" id="state" value={details.state} onChange={(e) => handleChange("state", e)} required>
          <Option value="">Select</Option>
          {STATES.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        <Input type="number" placeholder="Rs" name="Price per night (₹)" id="price" min="1" value={details.price} onChange={(e) => handleChange("price", e)} />
        <YesNo title="Unmarried Friendly" id="unmarriedFriendly" value={details.unmarriedFriendly} onChange={(e) => handleChange("unmarriedFriendly", e)} />
        <YesNo title="AC Room Available" id="AcRoomA" value={details.AcRoomA} onChange={(e) => handleChange("AcRoomA", e)} />
        <YesNo title="Non-AC Room Available" id="NonAcRoomA" value={details.NonAcRoomA} onChange={(e) => handleChange("NonAcRoomA", e)} />
        <Input type="number" placeholder="Number of rooms" name="Total AC Rooms" id="TotalAc" min="0" value={details.TotalAc} onChange={(e) => handleChange("TotalAc", e)} />
        <Input type="number" placeholder="Number of rooms" name="Total Non-AC Rooms" id="TotalNonAc" min="0" value={details.TotalNonAc} onChange={(e) => handleChange("TotalNonAc", e)} />

        <div className="sm:col-span-2">
          <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto">
            {busy ? "Saving…" : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
