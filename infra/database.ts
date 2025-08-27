export const zipDemographicTable = new sst.aws.Dynamo("ZipDemographicTable", {
    fields: {
        id: "string",
        zipCode: "string",
        neighboorhood: "string"
    },
    primaryIndex: {hashKey: "id"},
    globalIndexes: {
        byZipCode: { hashKey: "zipCode" },
        byNeighboorhood: {hashKey: "neighboorhood"}
    } 
});

export const neighboorhoodDemographicTable = new sst.aws.Dynamo("NeighboordhoodTable", {
    fields: {
        id: "string",
        // name: "string",
        // county: "string",
        // stateCode: "string"
    },
    primaryIndex: {hashKey: "id"},
});

export const outputs = {
    NEIGHBOORHOODS_TABLE: neighboorhoodDemographicTable.name
};
