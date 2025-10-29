export type Gender = 'Male' | 'Female' | null;

export type Interest = 'climbing' | 'hiking' | 'swimming' | 'biking' | 'running' | 'gaming' | 'music' | 'art' | 'volleyball';

export type User = {
    id: number;
    name: string;
    surname?: string;
    age?: number;
    gender?: Gender;
    description?: string;
    lat: number;
    lon: number;
    interests: Interest[];
}