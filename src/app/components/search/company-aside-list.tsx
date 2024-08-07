import { getClientComapnies } from "@/lib/clienta-actions";
import React from "react";
import CompanyCard from "./company-card";

export default async function CompnayList({
  query,
  category,
  city,
}: {
  query: string;
  category: string;
  city: string;
  currentPage: number;
}) {
  const allComapnies = await getClientComapnies({
    category,
    city,
    query,
  });
  return (
    <div>
      {allComapnies.map((comp) => (
        <CompanyCard company={comp} key={comp._id} size="sm" />
      ))}
    </div>
  );
}
