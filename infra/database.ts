const vpc = new sst.aws.Vpc("AuroraVPC");


export const database = new sst.aws.Aurora("BatmanDatabase", {
    engine: "postgres",
    vpc
});