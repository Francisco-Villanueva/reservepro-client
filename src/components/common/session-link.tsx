"use client";
import React from "react";
import Link from "next/link";

export default function SessionLink() {
  return (
    <Link
      href={"https://reserve-pro-backoffice.vercel.app/"}
      className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300 font-semibold text-sm"
    >
      {"   Iniciar sesión"}
    </Link>
  );
}
