export function Formulahaversine(lat1, lon1, lat2, lon2) {
 
    let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    let dLon = ((lon2 - lon1) * Math.PI) / 180.0;
  
    // convert to radiansa
    lat1 = (lat1 * Math.PI) / 180.0;
    lat2 = (lat2 * Math.PI) / 180.0;
  
    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }


  
let text_la1= "-12.5313820408340643"
let text_lo1= "-40.31433641910553"
let text_la2 = "-12.530381843867302"
let text_lo2 = "-40.31131625175477"
