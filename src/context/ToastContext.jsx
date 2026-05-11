import React, { createContext, useContext, useState, useCallback } from "react";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 w-80">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`flex items-start gap-3 rounded-xl px-4 py-3 shadow-lg text-sm font-medium text-white transition-all ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {type === "success"
              ? <MdCheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              : <MdError className="h-5 w-5 flex-shrink-0 mt-0.5" />
            }
            <span className="flex-1">{message}</span>
            <button onClick={() => remove(id)} className="text-white/70 hover:text-white transition">
              <MdClose className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
