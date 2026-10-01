"use client";

import { useState } from "react";
import { z } from "zod";

interface Props {
  onAdd: (experience: any) => void;
  onCancel: () => void;
}

const AddExperienceForm = ({ onAdd, onCancel }: Props) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState<any>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (data: any) => {
    setError("");

    onAdd(data);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Company
          </label>

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Position
          </label>

          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Frontend Developer"
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Employment type
        </label>

        <select
          value={employmentType || ""}
          onChange={(e) =>
            setEmploymentType(e.target.value ? e.target.value : undefined)
          }
          className="h-12 w-full cursor-pointer rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
        >
          <option value="">Select employment type</option>
          <option value="FULL_TIME">Full-time</option>
          <option value="PART_TIME">Part-time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FREELANCE">Freelance</option>
          <option value="SELF_EMPLOYED">Self-employed</option>
          <option value="APPRENTICESHIP">Apprenticeship</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Start date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            End date
          </label>

          <input
            type="date"
            value={endDate}
            disabled={isCurrentlyWorking}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-30 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-white/60">
        <input
          type="checkbox"
          checked={isCurrentlyWorking}
          onChange={(e) => setIsCurrentlyWorking(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-blue-500"
        />
        I currently work here
      </label>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Location
        </label>

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. New Delhi, India or Remote"
          className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your responsibilities, achievements, or work..."
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 transition hover:text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="cursor-pointer rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Add experience
        </button>
      </div>
    </div>
  );
};

export default AddExperienceForm;
