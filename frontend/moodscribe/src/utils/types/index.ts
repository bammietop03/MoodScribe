export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

export interface SigninValues {
  fullName: string;
  password: string;
}

export interface Route {
  id: number;
  name: string;
  route?: string;
  icon: string;
}

export interface Quotes {
  quote: string;
  icon: string;
  color: string;
  id?: number;
}

export interface MoodSmileys {
  icon: string;
  name: string;
  value: number;
}

export interface Mood {
  moodSmiley: MoodSmileys;
  title: string;
  content: string;
  date: Date;
}

export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}
