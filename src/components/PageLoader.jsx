import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0d0d0d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            style={{
              width: "45px",
              height: "45px",
              border: "3px solid #f29a41",
              borderTopColor: "transparent",
              borderRadius: "50%",
            }}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
