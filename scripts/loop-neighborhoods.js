const fs = require('fs');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

const { AWS_REGION, NEIGHBOORHOODS_TABLE } = process.env;

const client = new DynamoDBClient({
  region: AWS_REGION || 'us-east-1',
});

const documentClient = DynamoDBDocument.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

// Read and parse the duval.json file
const duvalData = JSON.parse(fs.readFileSync('./scripts/data/duval.json', 'utf8'));

// Clean feature function (same as App.tsx)
const cleanFeature = (feature) => {
  const p = feature.properties;
  const total = p.total_population || 1;

  return {
    ...feature,
    properties: {
      ...p,
      college_rate: p.pct_college_or_higher, // just aliasing
      poverty_rate: (p.poverty_count / total) * 100,
      doctorate_rate: (p.doctorate / total) * 100,
      professional_rate: (p.professional / total) * 100,
      insured_rate: p.total_insured
        ? (p.insured / p.total_insured) * 100
        : null,
    },
  };
};

// Clean geo data function (same as App.tsx)
const cleanGeoData = ({ features, ...rest }) => ({
  ...rest,
  features: features.map(cleanFeature),
});

// Clean the data
const cleanedData = cleanGeoData(duvalData);

// Process and save neighborhoods to DynamoDB
async function processNeighborhoods() {
  console.log('Processing neighborhoods and saving to DynamoDB...');
  
  for (let index = 0; index < cleanedData.features.length; index++) {
    const feature = cleanedData.features[index];
    const {
      median_income,
      college_rate,
      professional_rate,
      insured_rate,
      poverty_rate,
      doctorate_rate,
      neighborhoods,
      zip,
      total_population,
      median_rent,
      median_home_value
    } = feature.properties;

    // Use the first neighborhood as the name (same as tooltip)
    const name = neighborhoods[0].neighborhood;

    const neighborhoodData = {
      id: `neighborhood-${index + 1}`,
      index: index + 1,
      name,
      community: neighborhoods[0].community,
      zip,
      median_income,
      college_rate: parseFloat(college_rate?.toFixed(1)),
      professional_rate: parseFloat(professional_rate?.toFixed(2)),
      insured_rate: insured_rate ? parseFloat(insured_rate.toFixed(1)) : null,
      poverty_rate: parseFloat(poverty_rate?.toFixed(1)),
      doctorate_rate: parseFloat(doctorate_rate?.toFixed(2)),
      total_population,
      median_rent,
      median_home_value,
      geodata: {
        type: feature.type,
        geometry: feature.geometry,
        coordinates: feature.geometry.coordinates
      }
    };

    try {
      // Save to DynamoDB
      await documentClient.put({
        TableName: NEIGHBOORHOODS_TABLE,
        Item: neighborhoodData
      });
      
      console.log(`✓ Saved neighborhood: ${name} (${index + 1}/${cleanedData.features.length})`);
    } catch (error) {
      console.error(`✗ Failed to save neighborhood ${name}:`, error.message);
    }
  }

  console.log(`\nTotal neighborhoods processed: ${cleanedData.features.length}`);
}

// Run the async function
processNeighborhoods().catch(console.error);