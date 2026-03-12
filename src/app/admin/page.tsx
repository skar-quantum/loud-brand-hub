"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Image,
  Palette,
  Type,
  Sparkles,
  FileText,
  Check,
  X,
  Lock,
  Trash2,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/contexts/admin-context";

const uploadCategories = [
  {
    id: "logos",
    name: "Logos",
    description: "Logo lockups, logomarks, wordmarks (SVG, PNG)",
    icon: Image,
    accepts: ".svg,.png,.pdf",
  },
  {
    id: "colors",
    name: "Color Palettes",
    description: "Color swatches and palette files (ASE, JSON)",
    icon: Palette,
    accepts: ".ase,.json,.css",
  },
  {
    id: "typography",
    name: "Typography",
    description: "Font files and type specimens (TTF, OTF, WOFF2)",
    icon: Type,
    accepts: ".ttf,.otf,.woff,.woff2",
  },
  {
    id: "inspiration",
    name: "Inspiration",
    description: "Campaign images, social posts, artwork (JPG, PNG, MP4)",
    icon: Sparkles,
    accepts: ".jpg,.jpeg,.png,.gif,.mp4,.webp",
  },
  {
    id: "guidelines",
    name: "Brand Guidelines",
    description: "PDF manuals and documentation",
    icon: FileText,
    accepts: ".pdf,.doc,.docx",
  },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  category: string;
  status: "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

interface StoredFile {
  name: string;
  category: string;
  url: string;
  size: number;
}

export default function AdminPage() {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchStoredFiles();
    }
  }, [isAdmin]);

  const fetchStoredFiles = async () => {
    try {
      const res = await fetch("/api/upload");
      const data = await res.json();
      if (data.files) {
        setStoredFiles(data.files);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    setDragOver(null);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files, categoryId);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files, categoryId);
    }
  };

  const processFiles = async (files: File[], categoryId: string) => {
    for (const file of files) {
      const uploadFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        category: categoryId,
        status: "uploading",
      };

      setUploadedFiles((prev) => [...prev, uploadFile]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", categoryId);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, status: "success", url: data.url }
                : f
            )
          );
          // Refresh stored files list
          fetchStoredFiles();
        } else {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, status: "error", error: data.error }
                : f
            )
          );
        }
      } catch (error) {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "error", error: "Upload failed" }
              : f
          )
        );
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const removeUpload = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 lg:min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600">
                <Lock className="h-8 w-8 text-black" />
              </div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-bold">Admin Access</h1>
            <p className="mb-6 text-center text-sm text-white/60">
              Enter password to manage brand assets
            </p>
            <form onSubmit={handleAuth}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={cn(
                  "mb-4 w-full rounded-xl border bg-black/50 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors",
                  loginError ? "border-red-500" : "border-white/20 focus:border-green-500"
                )}
              />
              {loginError && (
                <p className="mb-4 text-center text-sm text-red-400">Senha incorreta</p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-semibold text-black transition-all hover:opacity-90"
              >
                Access Admin
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Asset Manager</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              Upload and manage brand assets. Files are stored in Supabase Storage.
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Upload Categories */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uploadCategories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "relative overflow-hidden rounded-xl border-2 border-dashed p-6 transition-all",
                dragOver === category.id
                  ? "border-green-500 bg-green-500/10"
                  : "border-white/20 hover:border-white/40"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(category.id);
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => handleDrop(e, category.id)}
            >
              <input
                type="file"
                accept={category.accepts}
                multiple
                onChange={(e) => handleFileSelect(e, category.id)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <category.icon className="h-6 w-6 text-white/60" />
                </div>
                <h3 className="mb-1 font-semibold">{category.name}</h3>
                <p className="mb-3 text-xs text-white/50">{category.description}</p>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Upload className="h-3 w-3" />
                  Drop files or click to upload
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Uploads */}
        {uploadedFiles.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Recent Uploads</h2>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        file.status === "success"
                          ? "bg-green-500/20 text-green-400"
                          : file.status === "error"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-white/10 text-white/60"
                      )}
                    >
                      {file.status === "success" ? (
                        <Check className="h-4 w-4" />
                      ) : file.status === "error" ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-white/50">
                        {formatFileSize(file.size)} • {file.category}
                        {file.error && <span className="text-red-400"> • {file.error}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.url && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => removeUpload(file.id)}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Stored Files */}
        {storedFiles.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">
              Stored Assets ({storedFiles.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {storedFiles.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    {file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                      <Image className="h-5 w-5 text-white/60" />
                    ) : (
                      <FileText className="h-5 w-5 text-white/60" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-white/50">{file.category}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/40" />
                </a>
              ))}
            </div>
          </div>
        )}

        {storedFiles.length === 0 && uploadedFiles.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <Upload className="mx-auto mb-4 h-12 w-12 text-white/20" />
            <p className="text-white/60">No assets uploaded yet</p>
            <p className="mt-1 text-sm text-white/40">
              Drag and drop files to any category above
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
