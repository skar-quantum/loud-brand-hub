"use client";

import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper auth
    if (password === "LOUD2026") {
      setIsAuthenticated(true);
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

  const processFiles = (files: File[], categoryId: string) => {
    files.forEach((file) => {
      const uploadFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        category: categoryId,
        status: "uploading",
      };

      setUploadedFiles((prev) => [...prev, uploadFile]);

      // Simulate upload - replace with actual upload logic
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "success" } : f
          )
        );
      }, 1500);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  if (!isAuthenticated) {
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
                className="mb-4 w-full rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-green-500"
              />
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold lg:text-3xl">Asset Manager</h1>
          <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
            Upload and manage brand assets. Files will be available across the Brand Hub.
          </p>
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

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">Uploaded Files</h2>
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
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-3 font-semibold">📋 Next Steps</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>• Connect to Supabase Storage for persistent file storage</li>
            <li>• Set up OPENAI_API_KEY environment variable for Brand Agent</li>
            <li>• Upload brand guidelines PDF for RAG knowledge base</li>
            <li>• Add real logo assets to replace placeholders</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
