function createGeocoderApi() {
        return {
            forwardGeocode: async (location) => {
                const features = [];
                const myLocation = location; // Default location if not provided
                try {
                    const request = `https://nominatim.openstreetmap.org/search?q=${myLocation}&format=geojson&polygon_geojson=1&addressdetails=1`;
                    const response = await fetch(request);
                    const geojson = await response.json();

                    for (const feature of geojson.features) {
                        const center = [
                            feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
                            feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
                        ];
                        features.push({
                            type: 'Feature',
                            geometry: { type: 'Point', coordinates: center },
                            place_name: feature.properties.display_name,
                            properties: feature.properties,
                            text: feature.properties.display_name,
                            place_type: ['place'],
                            center
                        });
                    }
                } catch (e) {
                    console.error(`Failed to forwardGeocode with error: ${e}`);
                }
                return { features };
            }
        };
    }

    module.exports = { createGeocoderApi };