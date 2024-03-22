import { TRouteResponse } from "../App";
import "./RouteInfo.css";

export default function RouteInfo({ route }: { route: TRouteResponse }) {

  console.log(route);

  const arrivalTime = new Date(route.properties.arrival).toUTCString();
  const departureTime = new Date(route.properties.departure).toUTCString();
  const totalTravelTime = new Date(route.properties.duration).toUTCString();
  const totalTravelDistanceInKm = route.properties.distance / 1000; // Dividing by 1000 to convert from meters to km


  return (
    <>
      <h2>Route information</h2>
      <small>Please note all timezones are displayed in UTC</small>
      <div className="flex row">
        <div className="left">
          <p>Name:</p>
          <p>Departure time:</p>
          <p>Arrival time:</p>
          <p>Speed (knots):</p>
          <p>Total Travel time:</p>
          <p>Travel distance (in km):</p>
        </div>
        <div className="right">
          <p>{route.properties?.vessel?.name}</p>
          <p>{departureTime ? departureTime : '-' }</p>
          <p>{arrivalTime ? arrivalTime : '-' }</p>
          <p>{route.properties.speedInKts}</p>
          <p>{totalTravelTime}</p>
          <p>{totalTravelDistanceInKm}</p>
        </div>
      </div>
    </>
  );
}
