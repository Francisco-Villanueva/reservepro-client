import React from "react";
import { getCompanyData } from "@/lib/actions";
import { Clock2Icon, HomeIcon, MailCheck, MapPinnedIcon } from "lucide-react";

import {
  AddToCompany,
  CompnayMemberList,
  CompnayServicesList,
  DeleteCompany,
} from "@/layers/company/components";
import { CategoryCard } from "@/layers/dashboard/components";
import { MapComponent } from "@/components/common/map";
import WorkhourList from "@/components/common/work-hour-list";
import { EditCompany } from "../components/edit-company";
import { NeedReladcompanyPage } from "../components/need-reload-company";

export async function CompanyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const company = await getCompanyData(id);
  if (!company) return null;

  return (
    <div className="flex flex-col gap-4 flex-grow relative ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon className="size-5" />
          <p className="text-lg font-semibold ">{company?.name}</p>
          <NeedReladcompanyPage />
        </div>

        <div className="flex items-center gap-2">
          <EditCompany company={company} />
          <DeleteCompany company={company} />
        </div>
      </div>
      <hr />

      <div className="flex gap-2">
        {company.category.map((cat) => (
          <CategoryCard key={cat} category={cat} selected />
        ))}
      </div>

      <div className="flex items-center font-light gap-2">
        <MailCheck className="size-5" />
        <p>{company.email}</p>
      </div>

      <div className="flex flex-col ">
        <div className="flex items-center gap-2 font-light">
          <MapPinnedIcon className="size-5" />

          <p>{company.address.value}</p>
        </div>
        <div className="h-[40vh] w-full">
          {company.address.lat && company.address.lng ? (
            <MapComponent lat={company.address.lat} lng={company.address.lng} />
          ) : null}
        </div>

        <hr />
        <section className="mt-2  bg-background">
          <div className="flex  justify-between p-2">
            <p className="font-semibold">
              Miembros{" "}
              <span className="text-gray-400 text-sm">
                {" "}
                ({company.members?.length}){" "}
              </span>
            </p>
            <AddToCompany company={company} type="member" />
          </div>
          <CompnayMemberList company={company} />
        </section>
        <section className="mt-2  bg-background">
          <div className="flex  justify-between p-2">
            <p className="font-semibold">
              Servicios{" "}
              <span className="text-gray-400 text-sm">
                {" "}
                ({company.services?.length}){" "}
              </span>
            </p>
            <AddToCompany company={company} type="service" />
          </div>
          <CompnayServicesList company={company} />
        </section>
        <div className="mt-2">
          <p className="font-semibold">Horarios</p>
          {company.workhours?.length ? (
            <WorkhourList worhHours={company.workhours} />
          ) : (
            <div className="flex flex-col gap-2 bg-background border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
              <Clock2Icon className="size-10" />
              <p className="font-light text-sm w-60  text-center">
                No tienes horarios definidos para esta sucursal.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
