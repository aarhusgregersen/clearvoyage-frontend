import { useState, useEffect } from "react";
import "./App.css";
import logo from "/logo.png";
import axios from "axios";

const API_PATH = "//127.0.0.1:3002";

type TPort = {
  name: string;
  latitude: number;
  longitude: number;
};

type TRouteResponse = {
  properties: TRoute;
};

type TRoute = {
  arrival: number;
  departure: number;
  // details: any[];
  distance: number;
  duration: 0;
  hraIntersection: number;
  intersectsIceArea: boolean;
  mode: string;
  secaIntersection: number;
  speed: number;
  speedInKts: number;
  vessel: TRouteVessel;
};

type TRouteVessel = {
  draft: number;
  imo: number;
  length: number;
  maxDraft: number;
  name: string;
  width: number;
};

function App() {
  const [vessels, setVessels] = useState<TPort[] | null>(null);
  const [ports, setPorts] = useState<TPort[] | null>(null);
  const [selectedVessel, setSelectedVessel] = useState<TPort | null>();
  const [selectedPort, setSelectedPort] = useState<TPort | null>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [route, setRoute] = useState<TRouteResponse>();

  // Get data from API

  useEffect(() => {
    const fetchVessels = async () => {
      const res = await fetch(`${API_PATH}/vessels`);
      const json = await res.json();

      setVessels(json.data);
    };
    const fetchPorts = async () => {
      const res = await fetch(`${API_PATH}/ports`);
      const json = await res.json();

      setPorts(json.data);
    };

    fetchVessels().catch(console.error);
    fetchPorts().catch(console.error);
  }, []);

  const handleRequestSeaRoute = async () => {
    const postData = {
      vessel: selectedVessel,
      port: selectedPort,
    };
    const res = await axios.post(`${API_PATH}/sea-route`, postData);

    console.log(res.data);

    setRoute(res.data);
  };

  return (
    <>
      <div>
        <a href="https://developer.searoutes.com/" target="_blank">
          <img src={logo} className="logo" alt="Logo" />
        </a>
      </div>
      <h1>Clearvoyage API</h1>
      <div className="flex">
        <div className="card">
          <h2>Vessels</h2>
          <select
            onChange={(e) => {
              const vessel = vessels?.find((x) => x.name === e.target.value);
              setSelectedVessel(vessel);
            }}
          >
            <option>Choose a vessel</option>
            {vessels
              ? vessels.map((vessel) => {
                  return (
                    <option key={vessel.name} value={vessel.name}>
                      {vessel.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className="card">
          <h2>Ports</h2>
          <select
            onChange={(e) => {
              const port = ports?.find((x) => x.name === e.target.value);
              setSelectedPort(port);
            }}
          >
            <option>Choose a Port</option>
            {ports
              ? ports.map((port) => {
                  return (
                    <option key={port.name} value={port.name}>
                      {port.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
      <div className="card">
        <button onClick={() => handleRequestSeaRoute()}>
          Find optimal route!
        </button>
      </div>

      {route ? (
        <div className="result">
          <p>Loaded!</p>
        </div>
      ) : null}
    </>
  );
}

export default App;
