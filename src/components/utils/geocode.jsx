
async function getAddress(address) {
    const apiKey = import.meta.env.VITE_API_KEY
    //const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const url2 = `https://geocode.googleapis.com/v4beta/geocode/address/${encodeURIComponent(address)}?key=${apiKey}`;
    const result = await fetch(url2);
    const data = await result.json();

    // if (data.status != "OK") {
    //     console.log(data)
    //     throw new Error("Geocoding failed", error.status);
    // }

    const location = data.results[0].location;
    return { lat: location.latitude, lng: location.longitude }
}

export default getAddress;