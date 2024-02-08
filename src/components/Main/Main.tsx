import { useEffect, useState } from "react";
import "./Main.Styles.css";
import { Map, MapMarker, Polyline, useKakaoLoader } from "react-kakao-maps-sdk";

interface MarkerPoint {
  lat: number;
  lng: number;
}

const geoOptions = {
  enableHighAccuracy: true,
};

const Main = () => {
  // 지도 center 를 표시해주는 Pin을 찍기위한 상태 - API 통신과는 무관
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 경로를 그리고 저장해서 API 에서 경록값을 보내기 위한 상태
  const [path, setPath] = useState<MarkerPoint[]>([]);

  const [fetchCount, setFetchCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const { VITE_APP_TITLE } = import.meta.env;

  // 해당 함수가 무조건 한번 실행이 되어야 웹 자체에서 카카오 맵 API의 구동이 정상적으로 진행될 수 있습니다.
  // 리다이렉트 포함
  useKakaoLoader({
    appkey: VITE_APP_TITLE,
    libraries: ["clusterer", "drawing", "services"],
  });

  useEffect(() => {
    // Interval 로 현재 값을 5초에 한번 불러옴
    const IntervalSuccess = ({ coords }: GeolocationPosition) => {
      const newPosition = { lat: coords.latitude, lng: coords.longitude };
      // 상태 추가
      setPath((prevPath) => [
        ...prevPath,
        { lat: coords.latitude, lng: coords.longitude },
      ]);

      setPosition(newPosition);

      setFetchCount((prevFetchCount) => prevFetchCount + 1);

      console.log("interval", newPosition);
    };

    // geolocation 동작중 오류 발생시 에러 카운트 추가
    const error = () => {
      setErrorCount((prevErrorCount) => prevErrorCount + 1);
    };

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        IntervalSuccess,
        error,
        geoOptions
      );
    }, 3000);

    return () => {
      // 페이지 변깅시 삭제
      clearInterval(interval);

      // navigator.geolocation.clearWatch(check);
    };
  }, []);

  return (
    <>
      <h1 className="count">{fetchCount}</h1>
      <h1 className="error">{errorCount}</h1>
      <article className="main__layout">
        <Map className="main__map" center={position} level={3}>
          <Polyline
            path={path}
            strokeWeight={5}
            strokeOpacity={0.7}
            strokeColor={"#ff7f50"}
            strokeStyle={"solid"}
          />

          <MapMarker position={position} />
        </Map>
      </article>
    </>
  );
};

export default Main;
