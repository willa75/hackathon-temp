export interface SearchResults {
    areasToLive: any[];
    bestMatches: any[];
};

export interface CensusResult {
    id: string;
    transportationCost: number;
    housingCost: number;
    crimeScore: number; // higher = worse?
    jobDensity: number; // higher = better?
    groceryCost: number; // higher = worse?
}