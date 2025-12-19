export interface Country {
  code: string;
  name: string;
  continent: {
    code: string;
    name: string;
  };
  currency?: string;
  languages: Array<{
    code: string;
    name: string;
  }>;
  capital?: string;
}

export interface Continent {
  code: string;
  name: string;
}

export interface VideoSource {
  url: string;
  title: string;
  description?: string;
}