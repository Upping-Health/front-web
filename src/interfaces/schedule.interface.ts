import DefaultEntityType from "./default";

export default interface Schedule extends DefaultEntityType {
  patientId: number;
  nutritionistName: string
  patientName: string
  observation: string | null;
  start_time: string;
  end_time: string;
  nutritionistId: number;
}
