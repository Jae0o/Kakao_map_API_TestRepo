import "./Move.Styles.css";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { debounce } from "lodash";

const Move = () => {
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [addr, setAddr] = useState("");

  const setCenterPosition = debounce(({ lat, lng }) => {
    setCenter({
      lat,
      lng,
    });
  }, 100);

  const geo = new kakao.maps.services.Geocoder();
  const findAddr = ({ lat, lng }: { lat: number; lng: number }) => {
    geo.coord2RegionCode(lng, lat, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) {
        return;
      }

      setAddr(result[0].address_name);
    });
  };

  const findDe = debounce(findAddr, 100);

  const changeCenter = (map: kakao.maps.Map) => {
    const latLng = map.getCenter();

    const current = {
      lat: latLng.getLat(),
      lng: latLng.getLng(),
    };

    setCenterPosition(current);
    findDe(current);
  };

  const clickMap = (e: kakao.maps.event.MouseEvent) => {
    const { latLng } = e;

    const current = {
      lat: latLng.getLat(),
      lng: latLng.getLng(),
    };

    setCenterPosition(current);
    findDe(current);
  };

  return (
    <article className="move__layout">
      <Map
        className="move__map"
        center={center}
        level={3}
        onCenterChanged={changeCenter}
        onClick={(_, e) => clickMap(e)}
      >
        <MapMarker position={center} />
      </Map>
      <p className="path">{addr}</p>
    </article>
  );
};
export default Move;
