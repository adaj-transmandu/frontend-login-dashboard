'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCompanyStore } from "@/stores/CompanyStore";
  

const CompanySelectMobile = () => {

  const {selectedCompany, selectedStation, setSelectedCompany, setSelectedStation} = useCompanyStore();

  const handleCompanySelect = (value: string) => {
    setSelectedCompany(value)
  }
  const handleStationSelect = (value: string) => {
    setSelectedStation(value)
  }

  return (
    <div className="flex flex-col items-center gap-y-2 mt-8 -mb-4 md:hidden">
      <Select onValueChange={handleCompanySelect} defaultValue={selectedCompany || ''}>
      <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Empresa" />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="transmandu">Transmandu</SelectItem>
          <SelectItem value="hangar74">Hangar74</SelectItem>
          <SelectItem value="AVSEC">AVSEC</SelectItem>
      </SelectContent>
      </Select>
      <Select onValueChange={handleStationSelect} defaultValue={selectedStation || '' }>
      <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Estacion" />
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

export default CompanySelectMobile