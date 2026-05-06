export interface CrossReference {
  chapterId: string;
  sourcePage: number;
  targetPage: number;
  note?: string;
}

export interface Chapter {
  _id: string;
  title: string;
  summary: string;
  content: string;
  pdfFilename: string;
  pdfOriginalName: string;
  crossReferences: CrossReference[];
}
