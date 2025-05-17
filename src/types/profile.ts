// ----- Type Definitions -----
export type Route = {
    key: string;
    title: string;
    icon: string;
};

export type AccordionItem = {
    title: string;
    completed: boolean;
    content: React.ReactNode;
    icon: string;
};

export interface SelectOption {
    value: number;
    text: string;
}

export interface Address {
    address1: string | null;
    address2: string | null;
    city: string | null;
    stateID: number | null;
    zipCode: string | null;
    countryID: number | null;
    stateCode: string | null;
    countryCode: string | null;
    stateList: SelectOption[] | null;
    countryList: SelectOption[] | null;
    phone?: string;
  }
  
  export interface AddressInfo {
    physicalAddress: Address;
    mailingAddress: Address;
    homePhone: string;
    mobilePhone: string;
    otherPhone: string;
    notes: string | null;
    isSamePhysical: boolean | null;
  }