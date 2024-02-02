import "./Main.Styles.css";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

const Main = () => {
  const { VITE_APP_TITLE } = import.meta.env;

  // 해당 함수가 무조건 한번 실행이 되어야 웹 자체에서 카카오 맵 API의 구동이 정상적으로 진행될 수 있습니다.
  // 리다이렉트 포함
  useKakaoLoader({
    appkey: VITE_APP_TITLE,
    libraries: ["clusterer", "drawing", "services"],
  });

  return (
    <article className="main__layout">
      <Map
        className="main__map"
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={3}
      />
    </article>
  );
};

export default Main;
