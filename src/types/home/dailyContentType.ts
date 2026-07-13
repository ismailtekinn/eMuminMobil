export interface DailyVerse {
  text: string;
  arabic?: string;
  source: string;
}

export interface DailyHadith {
  text: string;
  source: string;
}

export interface DailyContent {
  verse: DailyVerse;
  hadith: DailyHadith;
}
