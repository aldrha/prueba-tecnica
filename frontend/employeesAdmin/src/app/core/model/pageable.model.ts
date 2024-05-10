export class pageableModel<T> {
  recordsTotal: number;
  recordsFiltered: number;
  list: T;
  data: any;
}

export class ParametersModel {
  start: number;
  length: number;
  order: string;
  search?: string;
  sort: string;
  searchAdvanced?: string;
  startDate?: string;
  endDate?: string;
}
