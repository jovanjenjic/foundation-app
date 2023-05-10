export interface Employee {
    _id: string;
    deletedAt: null | Date;
    isDeleted: boolean;
    dateOfBirth: Date;
    dateOfEmployment: Date;
    homeAddress: {
      addressLine1: string;
      addressLine2: string;
      ZIPCode: string;
      city: string;
      _id: string;
    };
    phoneNumber: string;
    email: string;
    name: string;
    __v: number;
  }

export interface EmployeesResponse {
    employees: Employee[];
    count: number;
}

export interface EmployeeQueryArgsData {
    page?: number;
    size?: number;
    searchText?: string;
  };
  