import DefaultEntityType from "./default";

export default interface Schedule extends DefaultEntityType {
  patientId: number;
  nutritionistName: string
  patientName: string
  observation: string | null;
  startDate: string;
  endDate: string;
  nutritionistId: number;
}
