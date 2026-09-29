"use client";

import { useState } from "react";

interface Props {
  onAdd: (education: any) => void;
  onCancel: () => void;
}

const AddEducationForm = ({ onAdd, onCancel }: Props) => {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    onAdd({
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      description,
      isCurrentlyStudying,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Institution
        </label>

        <input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="University or college"
          className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Degree
          </label>

          <input
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Bachelor's, Master's, etc."
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Field of study
          </label>

          <input
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            placeholder="Computer Applications"
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />
        </div>
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
            disabled={isCurrentlyStudying}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-30 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
          />
        </div>
      </div>

      <label className="flex font-semibold cursor-pointer items-center gap-3 text-sm text-white/60">
        <input
          type="checkbox"
          checked={isCurrentlyStudying}
          onChange={(e) => setIsCurrentlyStudying(e.target.checked)}
          className="h-4 w-4 accent-blue-500"
        />
        I am currently studying here
      </label>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Grade
        </label>

        <input
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="CGPA, percentage, GPA, etc."
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
          placeholder="Add anything relevant about your education..."
          rows={4}
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
          Add education
        </button>
      </div>
    </div>
  );
};

export default AddEducationForm;
