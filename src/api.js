export const extractLocations = (events) => {
    let extractLocations = events.map((event) => event.location);
    let locations = [...new Set(extractLocations)];
    return locations;
};

export const limitResults = (results, limit) => {
    if(results.length > limit) {
        let limitedResults = results.slice(0, limit);
        return limitedResults;
    }

    return results;
};