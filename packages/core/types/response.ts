export interface ZipEntity {
    zipCode: string;
    geoId: string;
    GEOIDFQ20: string;
    CLASSFP20: string;
    MTFCC20: string;
    FUNCSTAT20:	string;
    ALAND20: number;
    AWATER20: number;
    INTPTLAT20: string;
    INTPTLON20:	string;
    total_population: number;
    median_income: number;
    median_rent: number;
    mean_commute_time?: number;
    labor_force: number;
    unemployed: number;
    bachelors: number;
    masters: number;
    professional: number;
    doctorate: number;
    pct_college_or_higher: number;
    zip_code: string;
    centroid_lon: number;
    centroid_lat: number;
    median_rent_score: number;
    median_income_score: number;
    mean_commute_time_score: number;
    pct_college_or_higher_score: number;
    employed_score: number;
    livability_score: number;
    neighboorhoodId: string;
}

export interface NeighboorhoodEntity {
    id: string;
    index: number;
    name: string;
    community: string;
    zip: string;
    median_income: number;
    college_rate: number;
    professional_rate: number;
    insured_rate: number | null;
    poverty_rate: number;
    doctorate_rate: number;
    total_population: number;
    median_rent: number;
    median_home_value: number;
    geodata: {
        type: string;
        geometry: {
            type: 'Polygon' | 'MultiPolygon';
            coordinates: number[][][] | number[][][][];
        };
        coordinates: number[][][] | number[][][][];
    };
}

export interface SearchResults {
    bestMatches: NeighboorhoodEntity[];
};

export interface CensusResult {
    id: string;
    transportationCost: number;
    housingCost: number;
    crimeScore: number; // higher = worse?
    jobDensity: number; // higher = better?
    groceryCost: number; // higher = worse?
}

interface NeighborhoodInfo {
    community: string;
    neighborhood: string;
}

interface NeighborhoodProperties {
    // Geographic identifiers
    zcta_zip: string;
    GEOID20: string;

    // Population data
    total_population: number;
    poverty_count: number;
    employed: number;

    // Income data
    median_income: number;
    per_capita_income: number;

    // Education data
    bachelors: number;
    masters: number;
    professional: number;
    doctorate: number;
    pct_college_or_higher: number;

    // Insurance data
    insured: number;
    total_insured: number;
    pct_insured: number;

    // Housing data
    median_rent: number;
    median_home_value: number;

    // Transportation
    mean_commute_time: number;
    public_transit_pct: number;

    // Neighborhood info
    neighborhoods: NeighborhoodInfo[];

    // Computed properties (added by cleanFeature)
    college_rate: number;
    poverty_rate: number;
    doctorate_rate: number;
    professional_rate: number;
    insured_rate: number | null;
}

interface NeighborhoodFeature {
    type: 'Feature';
    properties: NeighborhoodProperties;
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: number[][][] | number[][][][];
    };
}
