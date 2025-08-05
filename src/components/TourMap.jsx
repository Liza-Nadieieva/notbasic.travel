import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function TourMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const { ref: mapBlockRef, inView: isMapInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const points = [
    { coords: [2.6502, 39.5696], label: "Palma de Mallorca" },
    { coords: [2.7370, 39.7515], label: "Ecovinyassa" },
    { coords: [2.6276, 39.5626], label: "Marina Palma" },
    { coords: [2.5711, 39.5328], label: "Portals Nous" },
    { coords: [2.7156, 39.7667], label: "Sóller" },
    { coords: [2.7200, 39.7922], label: "Port de Sóller" },
    { coords: [2.7304, 39.5481], label: "Palma Airport", color: "#00ADEF" },
    { coords: [2.5324, 39.5098], label: "Home 🏡, Magaluf", color: "#3CB371" },
  ];

  const routeCoordinates = points.map(point => point.coords);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.6, 39.6],
      zoom: 7.5,
      interactive: false,
    });

    points.forEach((point) => {
      new mapboxgl.Marker({ color: point.color || "#FF7E5F" })
        .setLngLat(point.coords)
        .setPopup(new mapboxgl.Popup().setText(point.label))
        .addTo(map.current);
    });

    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
        },
      });

      map.current.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF7E5F",
          "line-width": 3,
          "line-dasharray": [1, 2],
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    if (isMapInView) {
      map.current.flyTo({
        center: [2.52, 39.54],
        zoom: 7.5,
        speed: 0.5,
        curve: 1.5,
        easing: (t) => t,
        essential: true,
      });

      const id = setTimeout(() => {
        map.current.flyTo({
          center: [2.6, 39.66],
          zoom: 9.5,
          speed: 0.5,
          curve: 1.5,
          easing: (t) => t,
          essential: true,
        });
        setZoomed(true);
      }, 1000);

      setTimeoutId(id);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      setZoomed(false);

      map.current.flyTo({
        center: [2.8, 39.6],
        zoom: 7,
        speed: 0.6,
        curve: 1.5,
        easing: (t) => t,
        essential: true,
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMapInView]);

  return (
    <div
      ref={mapBlockRef}
      className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg"
    >
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

