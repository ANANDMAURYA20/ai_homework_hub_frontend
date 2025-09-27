import { useState } from "react";
import { homeworkApi } from "../api/client";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  BookOpen,
  Calendar,
  Hash,
  ClipboardList,
  FileUp,
} from "lucide-react";

export default function HomeworkForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [points, setPoints] = useState(10);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("subject", subject);
      fd.append("class", className);
      fd.append("deadline", deadline);
      fd.append("points", points);
      if (file) fd.append("attachments", file);

      const { data } = await homeworkApi.create(fd);
      if (onCreated) onCreated(data);

      // Reset form
      setTitle("");
      setDescription("");
      setSubject("");
      setClassName("");
      setDeadline("");
      setPoints(10);
      setFile(null);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to create homework");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={submit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Homework Title *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              placeholder="Enter homework title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <div className="relative">
        <ClipboardList
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />
        <textarea
          placeholder="Enter homework description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          rows="3"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="e.g., Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Class */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Class *
        </label>
        <div className="relative">
          <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="e.g., 10A"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
          <Calendar size={16} /> Deadline *
        </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      {/* Points */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Points
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value) || 10)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>
    </div>

       {/* File Upload */}
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
          <FileUp className="w-4 h-4 text-cyan-600" />
        </div>
        Attach Files
      </label>
      <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 bg-white/50 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-4">
            <FileUp className="w-8 h-8 text-cyan-600" />
          </div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-lg text-gray-600 file:mr-4 file:py-3 file:px-6
                       file:rounded-xl file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white
                       hover:file:from-cyan-600 hover:file:to-blue-600 transition-all duration-300
                       file:shadow-lg hover:file:shadow-xl file:cursor-pointer"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
          />
          <p className="text-sm text-gray-500 mt-4">
            Supported: PDF, DOC, DOCX, JPG, PNG, TXT (Max 50MB)
          </p>
          {file && (
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-700 font-medium">✓ {file.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Submit Buttons */}
    <div className="flex flex-col sm:flex-row gap-6 pt-8">
      <button
        type="button"
        onClick={() => {
          setTitle("");
          setDescription("");
          setSubject("");
          setClassName("");
          setDeadline("");
          setPoints(10);
          setFile(null);
          setError("");
        }}
        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-lg"
      >
        Reset Form
      </button>
      <button
        type="submit"
        disabled={loading}
        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            Creating Homework...
          </>
        ) : (
          <>
            <Upload className="w-6 h-6" /> 
            Create Homework Assignment
          </>
        )}
      </button>
    </div>
  </form>

  {error && (
    <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl animate-scale-in">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-600 font-bold">!</span>
        </div>
        <p className="text-red-700 font-medium text-lg">{error}</p>
      </div>
    </div>
  )}
</div>
  );
}
