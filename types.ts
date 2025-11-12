
export interface TopPick {
  name: string;
  tagline: string;
}

export interface NameCategories {
  classic_trustworthy: string[];
  modern_bold: string[];
  creative_punny: string[];
  abstract_unique: string[];
}

export interface NameGenerationResponse {
  niche: string;
  categories: NameCategories;
  top3: TopPick[];
}

export interface DomainCheckResult {
  domain: string;
  likely_free: boolean;
  note: string;
}

export interface DomainCheckResults {
  [name: string]: {
    [tld: string]: DomainCheckResult;
  };
}
