import { useState } from "react";
import { toast } from "react-toastify";

interface DownloadButtonProps {
  publicId: string;
  url: string;
  filename?: string;
  className?: string;
}

const BASE_API = import.meta.env.VITE_API_BASE
export const DownloadButton = ({ publicId, url, filename, className }: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_API}/download/${publicId}`);
      if (!response.ok) {
        // Можна показати toast
        toast.error(`Failed to download: ${response.status}`);
        return;
      }

      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/octet-stream")) {
        toast.error("File not found or invalid format");
        return;
      }

      const blob = await response.blob();

      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename || url.split("/").pop() || "file";

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download failed:", err);
      toast.error(`Failed to download ${(err as Error).message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={className}
    >
      {loading ? "Downloading..." : "Download"}
    </button>
  );
};
