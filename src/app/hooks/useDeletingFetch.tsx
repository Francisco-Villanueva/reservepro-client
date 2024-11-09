"use client";
import { CompanyServices } from "@/services/company.services";
import { removeCompany } from "@/store/feature/company/companySlice";
import { useAppDispatch } from "@/store/hooks";

export default function useCreatingFetch() {
  const dispatch = useAppDispatch();

  const deleteCompany = async (id: string) => {
    try {
      await CompanyServices.delete(id);
      dispatch(removeCompany(id));
    } catch (error) {
      console.log("Error creating Companies", error);
      throw error;
    }
  };
  return { deleteCompany };
}
