import { useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

const CENTER_POINT = { lat: 33.450701, lng: 126.570667 };

interface MarkerPoint {
  lat: number;
  lng: number;
}

const Path = () => {
  const [position, setPosition] = useState<MarkerPoint[]>([]);

  const insertPath = ({ latLng }: kakao.maps.event.MouseEvent) => {
    setPosition((prevMarker) => [
      ...prevMarker,
      { lat: latLng.getLat(), lng: latLng.getLng() },
    ]);
  };

  const insertPing = (target: kakao.maps.Polyline) => {
    console.log(target.getPath());
  };

  return (
    <>
      <Map
        className="move__map"
        center={CENTER_POINT}
        level={3}
        onClick={(_, e) => insertPath(e)}
      >
        <Polyline
          path={position}
          strokeWeight={5}
          strokeOpacity={0.7}
          strokeColor={"#ff7f50"}
          strokeStyle={"solid"}
          onClick={(target) => insertPing(target)}
        />

        {position &&
          position.map((po) => (
            <MapMarker
              position={{
                lat: po.lat - 0.00015,
                lng: po.lng,
              }}
            />
          ))}
      </Map>
    </>
  );
};

export default Path;
