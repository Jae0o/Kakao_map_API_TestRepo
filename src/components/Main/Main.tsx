import { useState } from "react";
import "./Main.Styles.css";
import { Map, Polyline, useKakaoLoader } from "react-kakao-maps-sdk";
import { throttle } from "lodash";

interface MarkerPoint {
  lat: number;
  lng: number;
}

const Main = () => {
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [path, setPath] = useState<MarkerPoint[]>([]);
  const [fetchCount, setFetchCount] = useState(0);
  const { VITE_APP_TITLE } = import.meta.env;

  // 해당 함수가 무조건 한번 실행이 되어야 웹 자체에서 카카오 맵 API의 구동이 정상적으로 진행될 수 있습니다.
  // 리다이렉트 포함
  useKakaoLoader({
    appkey: VITE_APP_TITLE,
    libraries: ["clusterer", "drawing", "services"],
  });

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  });

  const success = throttle(({ coords }: GeolocationPosition) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude,
    });

    setPath((prev) => [
      ...prev,
      { lat: coords.latitude, lng: coords.longitude },
    ]);

    setFetchCount((count) => count + 1);
  }, 5000);

  const error = (error: GeolocationPositionError) => {
    console.log(error);
  };

  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 10,
    timeout: 5000,
  });

  return (
    <>
      <h1 className="count">{fetchCount}</h1>
      <article className="main__layout">
        <Map className="main__map" center={position} level={3}>
          <Polyline
            path={path}
            strokeWeight={5}
            strokeOpacity={0.7}
            strokeColor={"#ff7f50"}
            strokeStyle={"solid"}
          />
        </Map>
      </article>
      <h1>{}</h1>
    </>
  );
};

export default Main;
