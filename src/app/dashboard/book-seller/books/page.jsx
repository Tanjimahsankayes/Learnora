"use client";

import React, { useState } from "react";
import {
  Upload,
  Plus,
  Loader2,
  ImagePlus,
  Star,
  DollarSign,
  BookOpen,
  X,
  Tag,
  CheckCircle2,
  Phone,
  MapPin,
  Layers,
  FileText,
  Sparkles,
  Percent,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";
import { createBook } from "@/lib/actions/books";

export default function AddBookForm() {
  const [loading, setLoading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Images state
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  // Tag Input State
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["Programming", "Next.js", "Web Dev"]);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    language: "English",
    format: "Paperback",
    price: "",
    discountPrice: "",
    stock: "1",
    rating: "5.0",
    condition: "like-new",
    description: "",
    isbn: "",
    sellerEmail: "",
    sellerPhone: "",
    pickupLocation: "",
  });

  // Upload Single Image to ImgBB
  const uploadToImgBB = async (file) => {
    const data = new FormData();
    data.append("image", file);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.success) {
      return result.data.display_url;
    } else {
      throw new Error("Failed to upload image");
    }
  };

  // Cover Upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCoverUploading(true);
    try {
      const url = await uploadToImgBB(file);
      setCoverImage(url);
    } catch (err) {
      toast.error("Cover image upload failed!");
    } finally {
      setCoverUploading(false);
    }
  };

  // Gallery Images Upload
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setGalleryUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        files
          .slice(0, 4 - galleryImages.length)
          .map((file) => uploadToImgBB(file)),
      );
      setGalleryImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      toast.error("Some images failed to upload!");
    } finally {
      setGalleryUploading(false);
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Tag Handling
  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice
        ? parseFloat(formData.discountPrice)
        : null,
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock, 10),
      coverImage,
      galleryImages,
      tags,
      createdAt: new Date().toISOString(),
    };

    try {
      console.log("Submitting Payload to API:", payload);
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to publish book");
      }

      console.log("Server Response:", result);
      toast.success("Book Listing Published Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Submission Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-850/50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Learnora
                Merchant Center
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Post a Book for Sale
              </h1>
              <p className="text-indigo-200 text-sm mt-1 max-w-xl">
                Add complete book specs, set prices, upload high-quality
                previews, and reach thousands of students instantly.
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <BookOpen className="w-8 h-8 text-indigo-300" />
            </div>
          </div>
        </div>

        {/* Main Form Box */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Book Media */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-700/80 text-white">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <ImagePlus className="w-5 h-5 text-indigo-600" /> Book Covers &
              Media
            </h2>
            <p className="text-xs text-slate-200 mb-6">
              Upload main cover photo and optional preview pages.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Cover Upload */}
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Main Cover Image *
                </label>
                <div className="relative w-full h-64 rounded-xl border-2 border-dashed border-slate-400 bg-slate-850 hover:bg-slate-100/50 transition flex flex-col items-center justify-center overflow-hidden">
                  {coverImage ? (
                    <>
                      <img
                        src={coverImage}
                        alt="Cover Preview"
                        className="w-full h-full object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="absolute top-2 right-2 bg-slate-900/80 text-slate-200 p-1 rounded-full hover:bg-red-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : coverUploading ? (
                    <div className="flex flex-col items-center gap-2 text-indigo-600">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-xs font-medium">
                        Uploading to ImgBB...
                      </span>
                    </div>
                  ) : (
                    <label className="cursor-pointer text-center p-4 w-full h-full flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-indigo-500 mb-2" />
                      <span className="text-sm font-semibold text-slate-200">
                        Click to Upload Cover
                      </span>
                      <span className="text-xs text-slate-200 mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Secondary Gallery */}
              <div className="md:col-span-7">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Additional Preview Shots (Max 4)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-28 rounded-xl border border-slate-200 overflow-hidden bg-slate-800 group"
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {galleryImages.length < 4 && (
                    <label className="h-28 rounded-xl border-2 border-dashed border-slate-200 bg-slate-850 hover:border-indigo-400 cursor-pointer flex flex-col items-center justify-center transition">
                      {galleryUploading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                      ) : (
                        <>
                          <Plus className="w-5 h-5 text-slate-400 mb-1" />
                          <span className="text-xs text-slate-400 font-medium">
                            Add Preview
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                        disabled={galleryUploading}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-slate-200">
                  Upload index page, table of contents, or inner sample pages to
                  build trust with buyers.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: General Info */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-lg font-bold text-slate-200 mb-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Book Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Master in Next.js 15 Fullstack"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Author Name *
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Tanjim Ahsan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition bg-slate-700"
                >
                  <option value="">Select Category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Self Development">Self Development</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Academic Textbook">Academic Textbook</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Format Type
                </label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition bg-slate-700"
                >
                  <option value="Paperback">Paperback</option>
                  <option value="Hardcover">Hardcover</option>
                  <option value="PDF/E-Book">PDF / E-Book</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g. English, Bengali"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                />
              </div>
            </div>

            {/* Condition Radio Group */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase mb-2">
                Book Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "new", label: "Brand New" },
                  { id: "like-new", label: "Used - Like New" },
                  { id: "good", label: "Used - Good" },
                  { id: "acceptable", label: "Acceptable" },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`cursor-pointer border rounded-xl p-3 text-center transition flex items-center justify-center gap-2 ${
                      formData.condition === item.id
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-700 font-semibold"
                        : "border-slate-600 hover:bg-slate-500 text-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={item.id}
                      checked={formData.condition === item.id}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="text-xs">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Overview / Description *
              </label>
              <textarea
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Write book summary, edition info, chapter highlights, or physical condition details..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Section 3: Pricing & Inventory */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-lg font-bold text-slate-200 mb-1 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-white" /> Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Regular Price (৳) *
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Discount Price (Optional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="discountPrice"
                    step="0.01"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="420"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                  />
                  <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Available Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  min="1"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Initial Rating
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                  />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Extra Details & Tags */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-lg font-bold text-slate-200 mb-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" /> Additional Details
              & Tags
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Seller Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="sellerEmail"
                    required
                    value={formData.sellerEmail}
                    onChange={handleChange}
                    placeholder="seller@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Phone Number (Seller Contact)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="sellerPhone"
                    value={formData.sellerPhone}
                    onChange={handleChange}
                    placeholder="+880 1700-000000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                  Pickup Location / City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm outline-none transition"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Tags section */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase mb-1.5">
                Search Tags (Press Enter)
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-600 rounded-xl bg-indigo-900/50 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-600">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 border border-indigo-100"
                  >
                    <Tag className="w-3 h-3 text-indigo-500" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add a tag..."
                  className="flex-1 min-w-[120px] outline-none text-sm px-2 py-1"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || coverUploading || galleryUploading}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Publish Book Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
