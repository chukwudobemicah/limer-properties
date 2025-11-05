"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: "text-positive drop-shadow-sm",
    error: "text-negative drop-shadow-sm",
    warning: "text-warning drop-shadow-sm",
    info: "text-blue-500 drop-shadow-sm",
  };

  const Icon = icons[type];
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      }}
    >
      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors[type]}`} />
    </motion.div>
  );
};

const ToastItem = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) => {
  const [progress, setProgress] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const duration = toast.duration || 5000;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100);
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const styles = {
    success: {
      bg: "bg-[#e3eee8] border-positive/30",
      accent: "bg-positive",
      shadow: "shadow-[1px_4px_10px_0px_rgba(0,0,0,0.15)]",
    },
    error: {
      bg: "bg-[#f4e1e0] border-negative/30",
      accent: "bg-negative",
      shadow: "shadow-[1px_4px_10px_0px_rgba(0,0,0,0.15)]",
    },
    warning: {
      bg: "bg-[#eae8e2] border-warning/30",
      accent: "bg-warning",
      shadow: "shadow-[1px_4px_10px_0px_rgba(0,0,0,0.15)]",
    },
    info: {
      bg: "bg-[#dee6f2] border-blue-500/30",
      accent: "bg-blue-500",
      shadow: "shadow-[1px_4px_10px_0px_rgba(0,0,0,0.15)]",
    },
  };

  const currentStyle = styles[toast.type];

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: -50,
        x: isMobile ? 0 : 100,
        scale: 0.8,
        rotateX: isMobile ? 0 : -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
      }}
      exit={{
        opacity: 0,
        x: isMobile ? 0 : 100,
        y: isMobile ? -30 : 0,
        scale: 0.8,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`
        ${currentStyle.bg} ${currentStyle.shadow}
        border rounded-xl p-3 sm:p-4 w-full
        flex items-start gap-3 relative overflow-hidden
        hover:shadow-[2px_6px_12px_0px_rgba(0,0,0,0.2)]
        transition-shadow duration-300
      `}
    >
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
        <motion.div
          className={`h-full ${currentStyle.accent} rounded-full`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Content */}
      <ToastIcon type={toast.type} />

      <div className="flex-1 min-w-0">
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-text text-sm leading-tight"
        >
          {toast.title}
        </motion.p>
        {toast.message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-text/70 mt-0.5 leading-relaxed"
          >
            {toast.message}
          </motion.p>
        )}
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors duration-200 group min-w-[28px] min-h-[28px] flex items-center justify-center"
      >
        <X className="w-4 h-4 text-text/40 group-hover:text-text/70 transition-colors" />
      </motion.button>

      {/* Decorative Elements */}
      <div
        className={`absolute top-0 left-0 w-1 h-full ${currentStyle.accent} rounded-l-xl`}
      />
    </motion.div>
  );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts((prev) => [newToast, ...prev]);

    // Auto remove after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 left-[55%] -translate-x-1/2 sm:top-6 sm:right-6 sm:left-auto sm:translate-x-0 z-[9999] space-y-3 w-[85vw] max-w-xs sm:w-auto sm:max-w-xs">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast, index) => (
            <motion.div
              key={toast.id}
              layout
              style={{
                zIndex: toasts.length - index,
              }}
            >
              <ToastItem toast={toast} onClose={hideToast} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
