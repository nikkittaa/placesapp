export async function getAddress( lat, long){
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&query=${lat},${long}&subscription-key=${apiKey}`;
    console.log(lat, long);
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.addresses && data.addresses.length > 0) {
          const address = data.addresses[0].address.freeformAddress;
          console.log("Address:", address);
          return address;
        } else {
          console.log("No address found for the given coordinates.");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
}