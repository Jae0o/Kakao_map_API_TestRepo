import "./InfoMedal.Styles.css";
import { MouseEvent, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface MarkerPoint {
  lat: number;
  lng: number;
}
interface InfoMedalProps {
  message: string;
  position: MarkerPoint;
}

const InfoMedal = ({ message, position }: InfoMedalProps) => {
  const [isClick, setIsClick] = useState(false);

  const handleOnModal = (e: MouseEvent) => {
    e.stopPropagation();

    const { target, currentTarget } = e;
    if (target === currentTarget) {
      setIsClick(true);
    }
  };

  if (!isClick) {
    return (
      <CustomOverlayMap position={position}>
        <div onClick={handleOnModal} className="overlay__close">
          {"Open"}
        </div>
      </CustomOverlayMap>
    );
  }

  return (
    <CustomOverlayMap position={position} zIndex={100}>
      <div onClick={() => setIsClick(false)} className="overlay__open-layout">
        {message}
      </div>
    </CustomOverlayMap>
  );
};

export default InfoMedal;
