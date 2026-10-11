"use client";

import React, { useEffect, useCallback, useMemo } from "react";
import { X, Play, ExternalLink } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface VideoProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export function VideoProfileModal({
  isOpen,
  onClose,
  videoUrl = "https://www.instagram.com/reel/DcTV1BppDCL/?srtk=MW02N2o4b2cweGJrbw==",
  title = "Video Profil PAC IPNU IPPNU Lawang",
}: VideoProfileModalProps) {
  // Listener keyboard Escape untuk standar aksesibilitas
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Parsing URL embed untuk Instagram Reel atau video eksternal
  const { embedUrl, externalUrl, isInstagram } = useMemo(() => {
    if (videoUrl.includes("instagram.com")) {
      const match = videoUrl.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i);
      const shortcode = match ? match[1] : "";
      return {
        embedUrl: shortcode
          ? `https://www.instagram.com/reel/${shortcode}/embed/`
          : videoUrl,
        externalUrl: videoUrl,
        isInstagram: true,
      };
    }

    return {
      embedUrl: videoUrl,
      externalUrl: videoUrl,
      isInstagram: false,
    };
  }, [videoUrl]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    >
      {/* Backdrop dengan efek blur */}
      <div
        className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Konten Modal - Disesuaikan vertikal ramping untuk Instagram Reel */}
      <div
        className={`relative w-full ${
          isInstagram ? "max-w-md" : "max-w-4xl"
        } bg-[#1e293b] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]`}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/10 bg-[#0f172a]/70 shrink-0">
          <div className="flex items-center space-x-2 text-white min-w-0 pr-2">
            {isInstagram ? (
              <InstagramIcon className="w-5 h-5 text-[#ece1d1] shrink-0" />
            ) : (
              <Play className="w-5 h-5 text-[#ece1d1] fill-[#ece1d1] shrink-0" aria-hidden="true" />
            )}
            <h2
              id="video-modal-title"
              className="text-xs sm:text-sm font-bold tracking-tight truncate text-white"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ece1d1] shrink-0"
            aria-label="Tutup video profil"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Video Player */}
        <div
          className={`relative w-full flex-1 bg-black ${
            isInstagram
              ? "h-[500px] sm:h-[560px] overflow-hidden"
              : "pb-[56.25%]"
          }`}
        >
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={
              isInstagram
                ? "w-full h-full border-0"
                : "absolute top-0 left-0 w-full h-full border-0"
            }
          />
        </div>

        {/* Footer info modal */}
        <div className="px-4 py-3 bg-[#0f172a]/70 border-t border-white/10 text-xs text-white/75 flex items-center justify-between gap-3 shrink-0">
          <span className="truncate">PAC IPNU IPPNU Kecamatan Lawang</span>
          <div className="flex items-center space-x-2 shrink-0">
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#ece1d1] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ece1d1]"
              >
                <span>Buka di Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-xs font-semibold text-white/60 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
