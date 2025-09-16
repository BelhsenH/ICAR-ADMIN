export interface IHoursOfOperation {
  monday: IWorkingDay;
  tuesday: IWorkingDay;
  wednesday: IWorkingDay;
  thursday: IWorkingDay;
  friday: IWorkingDay;
  saturday: IWorkingDay;
  sunday: IWorkingDay;
}

export interface IWorkingDay {
  closed: boolean;
  morningPeriod: IWorkingPeriod;
  eveningPeriod: IWorkingPeriod;
}

export interface IWorkingPeriod {
  closed: boolean;
  openingTime: number | Date;
  closureTime: number | Date;
}
