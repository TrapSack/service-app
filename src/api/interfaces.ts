export interface ITableDetail {
  measurementCode: string;
  measurementSchema: IMeasurementSchema;
  measurmentDevices: IMeasurementDevice[];
  helperDevices: IMeasurementDevice[];
  errors: IDetailError[];
  graphicalInterpretation: IMeasurementSchema[];
  analyticalModels: IAnalyticalModel[];
  taskCodes: string[];
  id: string;
}

export interface ITablesContainer {
  [key: string]: ITableDetail[];
}

export interface IAnalyticalModel {
  mathFormula: string;
}

export interface IMeasurementSchema {
  schemaImage: string;
  imageDetails: [IMeasurementImageDetails, IMeasurementImageDetails];
}

export interface IMeasurementImageDetails {
  schemePointerNumber: number;
  schemePointerDescription: string;
}

export interface IMeasurementDevice {
  name: string;
}

export interface IDetailError {
  name: string;
}
