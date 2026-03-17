"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "image" | "pdf";
  src: string;
  title?: string;
  downloadable?: boolean;
}

export function PreviewModal({
  isOpen,
  onClose,
  type,
  src,
  title,
  downloadable = true,
}: PreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [pdfError, setPdfError] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 0.5));
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setZoom(1);
      setPdfError(false);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = title || "download";
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Header */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center gap-3">
              {title && (
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              )}
            </div>
            <div className="flex items-center gap-2">
              {type === "image" && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoom((z) => Math.max(z - 0.25, 0.5));
                    }}
                    className="rounded-lg bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                    title="Zoom out (-)"
                  >
                    <ZoomOut className="h-5 w-5" />
                  </button>
                  <span className="min-w-[4rem] text-center text-sm text-white/60">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoom((z) => Math.min(z + 0.25, 3));
                    }}
                    className="rounded-lg bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                    title="Zoom in (+)"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                </>
              )}
              {downloadable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="rounded-lg bg-green-500/20 p-2 text-green-400 transition-colors hover:bg-green-500/30"
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-lg bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                title="Fechar (ESC)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-h-[85vh] max-w-[90vw] overflow-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {type === "image" ? (
              <div
                className="flex items-center justify-center p-4"
                style={{ minWidth: "300px", minHeight: "300px" }}
              >
                <img
                  src={src}
                  alt={title || "Preview"}
                  className="max-h-[80vh] rounded-lg object-contain shadow-2xl transition-transform duration-200"
                  style={{ transform: `scale(${zoom})` }}
                  draggable={false}
                />
              </div>
            ) : (
              <div className="h-[85vh] w-[90vw] max-w-5xl overflow-hidden rounded-xl bg-white">
                {pdfError ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 bg-zinc-900 p-8 text-center">
                    <p className="text-white/60">
                      Não foi possível carregar o PDF no navegador.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-black transition-colors hover:bg-green-400"
                    >
                      <Download className="h-4 w-4" />
                      Baixar PDF
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={src}
                    className="h-full w-full"
                    title={title || "PDF Preview"}
                    onError={() => setPdfError(true)}
                  />
                )}
              </div>
            )}
          </motion.div>

          {/* Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/50">
            {type === "image"
              ? "ESC para fechar • +/- para zoom"
              : "ESC para fechar"}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
