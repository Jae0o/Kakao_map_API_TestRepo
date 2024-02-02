import { useRef, useState } from "react";
import "./Action.Styles.css";
import { Map } from "react-kakao-maps-sdk";

const Action = () => {
  // 좌표
  const [mapPoint, setMapPoint] = useState({ lat: 33.450701, lng: 126.570667 });

  // 부드러운 이동
  const [isPanto, setIsPanto] = useState(false);

  // 확대 축소 레벨 - 소수점 고장 확인
  const [mapLevel, setMapLevel] = useState(3);

  // 드래그 가능?
  const [draggable, setDraggable] = useState(true);

  // zoom 조작 여부 설정 가능 zoom able

  // 정보 얻기
  const mapRef = useRef<kakao.maps.Map>(null);

  const getInfo = () => {
    const { current } = mapRef;

    if (!current) {
      return;
    }

    // Map 기준 중앙 center 좌표
    const center = current.getCenter();
    const zoomLevel = current.getLevel();
    const mapType = current.getMapTypeId();

    // 좌표
    const bounds = current.getBounds();
    const SWLat = bounds.getSouthWest();
    const NELat = bounds.getNorthEast();

    console.log({
      center,
      zoomLevel,
      mapType,
      bounds: `영역 ${bounds}`,
      SWLat: `남서 좌표 ${SWLat}`,
      NELat: `북동 좌표 ${NELat}`,
    });
  };

  return (
    <article className="action">
      <Map
        className="action__map"
        center={mapPoint}
        isPanto={isPanto}
        level={mapLevel}
        ref={mapRef}
        draggable={draggable}
      />

      <ul className="action__list">
        {/* 드래그 조작 컨트롤 */}
        <li className="action__item">
          <button className="action__button" onClick={() => setDraggable(true)}>
            드래그 조작 가능
          </button>
          <button
            className="action__button"
            onClick={() => setDraggable(false)}
          >
            드래그 조작 불가능
          </button>
        </li>

        {/* 맵 전환을 부드럽게 */}
        <li className="action__item">
          <button className="action__button" onClick={() => setIsPanto(true)}>
            부드럽게
          </button>
          <button className="action__button" onClick={() => setIsPanto(false)}>
            안부드럽게
          </button>
        </li>

        {/* center 좌표 이동 테스트 */}
        <li className="action__item">
          <button
            className="action__button"
            onClick={() =>
              setMapPoint((state) => ({
                lat: state.lat - 0.001,
                lng: state.lng - 0.001,
              }))
            }
          >
            좌측 하단으로 이동
          </button>
          <button
            className="action__button"
            onClick={() =>
              setMapPoint((state) => ({
                lat: state.lat + 0.001,
                lng: state.lng + 0.001,
              }))
            }
          >
            우측 상단으로 이동
          </button>
        </li>

        {/* 줌 레벨 컨트롤 - 소수점은 불가능 */}
        <li className="action__item">
          <button
            className="action__button"
            onClick={() => setMapLevel((state) => state - 1)}
          >
            확대
          </button>
          <button
            className="action__button"
            onClick={() => setMapLevel((state) => state + 1)}
          >
            축소
          </button>
        </li>

        {/* center 기준 좌표 정보 획득 */}
        <li className="action__item">
          <button className="action__button" onClick={() => getInfo()}>
            좌표 정보 가져오기
          </button>
        </li>
      </ul>
    </article>
  );
};

export default Action;
