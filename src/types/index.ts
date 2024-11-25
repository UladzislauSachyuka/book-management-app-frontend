export interface Card {
  id: number;
  title: string;
  author: string;
  readingStartDate: string;
  readingEndDate: string;
}

export interface Input {
  id: string;
  type: string;
  labelText: string;
  onChange: (value: any) => void;
  value: any;
  className: string;
}
