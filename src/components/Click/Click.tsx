import { useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import InfoMedal from "./InfoMedal";

const CENTER_POINT = { lat: 33.450701, lng: 126.570667 };

interface MarkerPoint {
  lat: number;
  lng: number;
}

const Click = () => {
  const [showMarker, setShowMarker] = useState(true);
  const [markerPoint, setMarkerPoint] = useState<MarkerPoint[]>([]);

  // 해당 함수 내부에서 마커 + 경로 를 동시에 추가함
  const insertMarker = ({ latLng }: kakao.maps.event.MouseEvent) => {
    const accept = confirm("마커를 추가");

    if (!accept) {
      return;
    }

    setMarkerPoint((prevMarker) => [
      ...prevMarker,
      { lat: latLng.getLat(), lng: latLng.getLng() },
    ]);
  };

  return (
    <article className="main__layout">
      <Map
        className="main__map"
        center={CENTER_POINT}
        level={3}
        onClick={(_, mouseEvent) => {
          insertMarker(mouseEvent);
        }}
      >
        {showMarker &&
          markerPoint &&
          markerPoint.map((marker, index) => (
            <InfoMedal
              message={`이건 ${index + 1} 번째 핀 포인트 입니다.`}
              position={marker}
              key={index}
            />
          ))}

        {/* 각 좌표별 선 연결시키기 - 추후 경로 그릴때 사용 예정 */}
        <Polyline
          path={markerPoint}
          strokeWeight={5}
          strokeOpacity={0.7}
          strokeColor={"#ff7f50"}
          strokeStyle={"solid"}
        ></Polyline>

        {/* custom Marker 테스트 */}
        <MapMarker
          position={CENTER_POINT}
          image={{
            src: "https://res.cloudinary.com/dalxgxu2o/image/upload/v1699980818/IMG_0508_mke9kp.gif",
            size: {
              width: 50,
              height: 50,
            },
            options: {
              offset: {
                x: 0,
                y: 0,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      </Map>

      {/* 마커 전체 숨김 혹은 표시 기능 */}
      <ul>
        <li>
          <button onClick={() => setShowMarker((state) => !state)}>
            마커 표시 상태 변경
          </button>
        </li>
      </ul>
    </article>
  );
};

export default Click;
