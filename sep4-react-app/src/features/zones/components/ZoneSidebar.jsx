import { useState } from "react";
import { CROP_TYPES } from "../../../shared/data/cropProfiles.js";

export default function ZoneSidebar({ zones, selectedZoneId, onSelect, onCreate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [cropType, setCropType] = useState(CROP_TYPES[0]);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await onCreate({ name, cropType });
      setName("");
      setShowForm(false);
    } catch (error) { setMessage(error.message); }
  }

  return (
    <aside className="zone-sidebar">
      <div className="sidebar-heading"><div><span className="eyebrow">Workspace</span><h2>Greenhouse zones</h2></div><button className="icon-btn" onClick={() => setShowForm((value) => !value)} aria-label="Add zone">+</button></div>
      {showForm && (
        <form className="zone-form" onSubmit={submit}>
          <input aria-label="Zone name" placeholder="Zone name" value={name} onChange={(event) => setName(event.target.value)} required />
          <select aria-label="Crop type" value={cropType} onChange={(event) => setCropType(event.target.value)}>{CROP_TYPES.map((crop) => <option key={crop}>{crop}</option>)}</select>
          <button className="primary-btn compact">Create zone</button>
          {message && <small className="error-text">{message}</small>}
        </form>
      )}
      <div className="zone-list">
        {zones.map((zone) => (
          <button key={zone.id} className={zone.id === selectedZoneId ? "zone-item active" : "zone-item"} onClick={() => onSelect(zone.id)}>
            <span>{zone.name}</span><small>{zone.cropType}</small>
          </button>
        ))}
      </div>
      {selectedZoneId && <button className="danger-link" onClick={onDelete}>Delete selected zone</button>}
    </aside>
  );
}
