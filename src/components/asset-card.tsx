"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  name: string;
  description?: string;
  preview: React.ReactNode;
  formats?: string[];
  variant?: "light" | "dark" | "color";
  className?: string;
  downloadUrl?: string;
}

export function AssetCard({
  name,
  description,
  preview,
  formats = ["PNG", "PDF"],
  variant = "dark",
  className,
  downloadUrl,
}: AssetCardProps) {
  const handleDownload = (format: string) => {
    if (!downloadUrl) return;
    
    // Replace extension with requested format
    const baseUrl = downloadUrl.replace(/\.(svg|png|pdf)$/i, "");
    const url = `${baseUrl}.${format.toLowerCase()}`;
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.replace(/\s+/g, "-").toLowerCase()}.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border border-white/10 transition-all hover:border-white/20",
        className
      )}
    >
      {/* Preview */}
      <div
        className={cn(
          "flex h-32 items-center justify-center p-6",
          variant === "light" && "bg-white",
          variant === "dark" && "bg-zinc-900",
          variant === "color" && "bg-gradient-to-br from-green-500 to-green-600"
        )}
      >
        {preview}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/50 p-3">
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          {description && <p className="text-xs text-white/50">{description}</p>}
        </div>
        <div className="flex items-center gap-1">
          {formats.map((format) => (
            <button
              key={format}
              onClick={() => handleDownload(format)}
              className={cn(
                "rounded px-2 py-1 text-[10px] font-medium transition-colors",
                downloadUrl 
                  ? "text-white/70 hover:bg-green-500/20 hover:text-green-400" 
                  : "text-white/50 hover:bg-white/10 hover:text-white"
              )}
              title={downloadUrl ? `Download ${format}` : format}
            >
              {format}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
