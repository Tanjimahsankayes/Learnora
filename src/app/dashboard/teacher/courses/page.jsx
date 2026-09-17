"use client";

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Modal, Button } from "@heroui/react";
import toast from "react-hot-toast";

const ManageCourses = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Standard React State for Modal control
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/my-courses?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCourses(data.courses);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching courses:", err);
          setLoading(false);
        });
    } else if (!isPending) {
      setLoading(false);
    }
  }, [user?.email, isPending]);

  // Open Modal
  const handleOpenDeleteModal = (id) => {
    setSelectedCourseId(id);
    setIsOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    if (!isDeleting) {
      setIsOpen(false);
      setSelectedCourseId(null);
    }
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!selectedCourseId) return;

    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://localhost:5000/api/courses/${selectedCourseId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data.success) {
        setCourses((prev) =>
          prev.filter((item) => item._id !== selectedCourseId),
        );
        handleCloseModal();
      } else {
        toast.error(data.message || "Failed to delete course.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Something went wrong while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-600">
          <div>
            <h1 className="text-2xl font-bold text-gray-200">
              Manage My Courses
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              You have published total{" "}
              <span className="font-semibold text-indigo-400">
                {courses.length}
              </span>{" "}
              courses.
            </p>
          </div>
          <Link
            href="/dashboard/teacher/create-course"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-indigo-500/20"
          >
            <FaPlus className="text-sm" /> Add New Course
          </Link>
        </div>

        {/* Course List Table */}
        {courses.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-600">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-400 mb-6">
              You haven't added any course yet.
            </p>
            <Link
              href="/dashboard/teacher/create-course"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              <FaPlus /> Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-600 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-600 text-gray-200 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Course Info</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-sm text-gray-200">
                  {courses.map((course) => (
                    <tr
                      key={course._id}
                      className="hover:bg-slate-800/50 transition"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-12 rounded-lg object-cover border border-slate-700"
                          />
                          <div>
                            <h2 className="font-semibold text-gray-200 line-clamp-1">
                              {course.title}
                            </h2>
                            <span className="text-xs text-gray-400">
                              {course.level} • {course.duration}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-medium text-gray-300">
                        {course.category}
                      </td>

                      <td className="py-4 px-6 font-semibold text-gray-200">
                        {course.isFree ? (
                          <span className="text-green-500 font-bold">Free</span>
                        ) : (
                          <div>
                            ৳{course.discountPrice || course.price}
                            {course.discountPrice && (
                              <span className="text-xs text-gray-400 line-through ml-2">
                                ৳{course.price}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            course.status === "approved"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : course.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {course.status || "approved"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/courses/${course._id}`}
                            className="p-2 text-gray-300 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition"
                            title="View Course"
                          >
                            <TbListDetails size={16} />
                          </Link>

                          <Link
                            href={`/dashboard/edit-course/${course._id}`}
                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                            title="Edit Course"
                          >
                            <FaEdit size={16} />
                          </Link>

                          <button
                            onClick={() => handleOpenDeleteModal(course._id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                            title="Delete Course"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HeroUI Custom Controlled Modal */}
        {/* Delete Confirmation Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={handleCloseModal}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
                <h3 className="text-lg font-bold text-gray-200">
                  Confirm Deletion
                </h3>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isDeleting}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6">
                <p className="text-sm leading-6 text-gray-400">
                  Are you sure you want to delete this course? This action
                  cannot be undone.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 border-t border-slate-700 px-6 py-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isDeleting}
                  className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="min-w-[90px] rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
