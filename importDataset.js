const fs = require("fs");
const { createClient } = require("@sanity/client"); // Correctly import `createClient`
const sanityImport = require("@sanity/import"); // Import Sanity import module

// Set up the client for your Sanity project
const client = createClient({
  projectId: "st4vwzqs", // Replace with your Sanity project ID
  dataset: "production", // Replace with the target dataset name
  token:
    "skir1PeQduSojoA8AMleWsmUK48NVklgPk5tWLEXKknigw2xftcfNjbR9fhzGGNRDnoLRXJ1hr3vQnle1LA19ZovX7k7aY7GskUIKcH5PyX57asjJubRji9io5Tvz58WYSq7prArrkmrnQ6JaKqAE55cMIbXApQtTWkRr9OUX5VlyptlED8X", // API token with sufficient write permissions
  useCdn: false,
  apiVersion: "2023-10-01", // `false` if you want to bypass the cache
});

// Input can either be a readable stream (for a `.tar.gz` or `.ndjson` file)
const input = fs.createReadStream("production.tar.gz"); // Provide the correct path to your `.ndjson` file

const options = {
  client, // Use the pre-configured client

  operation: "createOrReplace", // Mutation type: 'create', 'createOrReplace', 'createIfNotExists'

  onProgress: (progress) => {
    console.log(`Progress: ${progress.step}, ${progress.current}/${progress.total}`);
  },

  allowAssetsInDifferentDataset: false, // Whether to allow assets from other datasets
  allowFailingAssets: false, // Allow failed assets without aborting the process
  replaceAssets: false, // Replace assets with the same hash
  skipCrossDatasetReferences: false, // Skip cross-dataset references
  allowSystemDocuments: false, // Skip importing system documents
};

// Perform the import
sanityImport(input, options)
  .then(({ numDocs, warnings }) => {
    console.log("Imported %d documents", numDocs);
    if (warnings.length > 0) {
      console.warn("Warnings:", warnings);
    }
  })
  .catch((err) => {
    console.error("Import failed: %s", err.message);
  });
