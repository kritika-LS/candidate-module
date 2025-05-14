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

export interface SelectOption {
  value: number;
  text: string;
}