'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import IssuePicker from "../components/IssuePicker";
import "../globals.css";


export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IssuePicker />
    </QueryClientProvider>
  );
}
