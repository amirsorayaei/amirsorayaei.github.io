export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  location: string;
  descriptions: string[];
  skills: string[];
}

export interface Result {
  message: string;
  type: "success" | "error";
}
