export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  funFact: string;
  diet: string;
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR'; // Least Concern, Near Threatened, Vulnerable, Endangered, Critically Endangered
  imageUrl: string;
  behavior?: string;
}

export interface FeedingSchedule {
  time: string;
  activityName: string;
  location: string;
  animalName: string;
}

export interface ZooShow {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Zone {
  id: string;
  title: string;
  chineseTitle: string;
  category: string;
  description: string;
  details: string;
  bannerImage: string;
  animals: Animal[];
  color: {
    primary: string;
    bg: string;
    text: string;
    accent: string;
  };
  features?: {
    activities?: string[];
    tips?: string[];
    schedule?: FeedingSchedule[];
  };
}
