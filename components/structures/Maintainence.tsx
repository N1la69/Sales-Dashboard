"use client";

import { getMaintenanceEnd } from "@/lib/maintenance";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Maintenance() {
  const [remaining, setRemaining] = useState<string>("");

  useEffect(() => {
    const updateRemaining = () => {
      const end = getMaintenanceEnd();
      if (!end) {
        setRemaining("0h 0m 0s");
        return;
      }
      const diff = end.getTime() - new Date().getTime();

      if (diff <= 0) {
        setRemaining("0h 0m 0s");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-5">
        {/* Logo + App Name */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo.png" // replace with your logo path (public/logo.png)
            alt="App Logo"
            width={64}
            height={64}
            className="shadow-md"
          />
          <h2 className="text-xl font-semibold text-gray-900">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h2>
        </div>

        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="flex justify-center"
        >
          <Settings className="w-16 h-16 text-blue-600" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          ⏳ Maintenance Mode
        </h1>

        {/* Subtext */}
        <p className="mt-2 text-gray-600">
          Our service is undergoing scheduled maintenance.
          <br />
          Please check back later.
        </p>

        {/* Countdown Timer */}
        <p className="text-sm text-gray-500">
          Estimated time remaining:{" "}
          <span className="font-medium">{remaining}</span>
        </p>

        {/* Progress animation */}
        <motion.div className="h-1 w-40 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
