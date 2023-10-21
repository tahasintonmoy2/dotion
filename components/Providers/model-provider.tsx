"use client";

import React, { useState, useEffect } from "react";
import SettingsModel from "@/components/models/settings-model";
import CoverImageModel from "@/components/models/cover-image-modal";

export const ModelProvider = () => {
    const [isMuted, setIsMuted] = useState(false)
    
    useEffect(() => {
        setIsMuted(true)
    }, [])

    if (!isMuted) {
        return null
    }
  return (
    <>
      <SettingsModel />
      <CoverImageModel />
    </>
  );
};
