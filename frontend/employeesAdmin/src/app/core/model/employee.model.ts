
export class ResponsePaginate<T> {
    current_page: number;
    data: any;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export class EmployeeModel {
    lastname: string;
    second_surname: string;
    name: string;
    middlename?: string;
    country_employment: string;
    type_document: string;
    document_number: string;
    admission_date: Date;
    area: string;
    email: string;
    status: number;
    updated_at: Date;
    created_at: Date;
    id: number;
    _method?: string;
}

export class Datum {
    id: number;
    lastname: string;
    second_surname: string;
    name: string;
    middlename: null | string;
    country_employment: CountryEmployment;
    type_document: string;
    document_number: string;
    email: string;
    admission_date: Date;
    area: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}

export enum CountryEmployment {
    Colombia = "COLOMBIA",
    Usa = "USA",
}

export class Link {
    url: null | string;
    label: string;
    active: boolean;
}

