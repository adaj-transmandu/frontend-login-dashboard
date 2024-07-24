import { create } from "zustand";

interface CompanyState {
    selectedCompany: string | null;
    selectedStation: string | null;
    setSelectedCompany: (company: string) => void;
    setSelectedStation: (station: string) => void;
    initFromLocalStorage: () => void; // Agregar initFromLocalStorage como opcional
}

export const useCompanyStore = create<CompanyState>((set) => ({
    selectedCompany: null,
    selectedStation: null,
    setSelectedCompany: (company) => {
        set({ selectedCompany: company });
        localStorage.setItem('selectedCompany', company);
    },
    setSelectedStation: (station) => {
        set({ selectedStation: station });
        localStorage.setItem('selectedStation', station);
    },
    initFromLocalStorage: () => {
        const savedSelectedCompany = localStorage.getItem('selectedCompany');
        if (savedSelectedCompany) {
            set({ selectedCompany: savedSelectedCompany });
        }

        const savedSelectedStation = localStorage.getItem('selectedStation');
        if (savedSelectedStation) {
            set({ selectedStation: savedSelectedStation });
        }
    },
}))
