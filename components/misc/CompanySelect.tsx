'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCompanyStore } from "@/stores/CompanyStore";
import { useEffect } from "react";
  

const CompanySelect = () => {

  const { selectedCompany, selectedStation, setSelectedCompany, setSelectedStation, initFromLocalStorage } = useCompanyStore();

  useEffect(() => {
      // Esta función initFromLocalStorage debería estar definida en useCompanyStore,
      // asegúrate de haberla definido en el hook Zustand como se mostró antes.
      // Si no está definida, puedes inicializar los valores directamente aquí.
      initFromLocalStorage();

  }, []);

  const handleCompanySelect = (value: string) => {
      setSelectedCompany(value);
  };

  const handleStationSelect = (value: string) => {
      setSelectedStation(value);
  };

  return (
    <div className="hidden items-center space-x-2 justify-center md:flex md:flex-1">
      <Select onValueChange={handleCompanySelect} defaultValue={selectedCompany || ''}>
      <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectedCompany ? `${selectedCompany.toUpperCase()}` : 'Empresa'}/>
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="transmandu">Transmandu</SelectItem>
          <SelectItem value="hangar74">Hangar74</SelectItem>
          <SelectItem value="avsec">AVSEC</SelectItem>
      </SelectContent>
      </Select>
      <Select onValueChange={handleStationSelect} defaultValue={selectedStation || '' }>
      <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectedStation ? `${selectedStation.toUpperCase()}` : 'Estacion'} defaultValue={selectedStation  || ''}/>
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="principal">Principal</SelectItem>
          <SelectItem value="b1">B1</SelectItem>
          <SelectItem value="b2">B2</SelectItem>
      </SelectContent>
      </Select>
    </div>
)
}

export default CompanySelect