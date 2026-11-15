import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { VIDEO_ID } from "./data";

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Why choose us video"
        >
          <button aria-label="Close video" onClick={onClose} className="absolute right-5 top-5 p-2 text-primary-foreground hover:text-gold">
            <X className="h-8 w-8" />
          </button>
          <motion.div
            className="aspect-video w-full max-w-[1000px] bg-navy-deep shadow-[var(--shadow-float)]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              title="Why choose us?"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
