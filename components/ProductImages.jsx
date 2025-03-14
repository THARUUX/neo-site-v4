import styled from "styled-components";
import {useState} from "react";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;

const ImageButton = styled.div`
    ${props => props.active ? `
      filter: brightness(90%);
      scale: 1.05;
    ` : `
      border-color: transparent;
    `}
    cursor: pointer;
  `;


export default function ProductImages({images}) {
  const [activeImage,setActiveImage] = useState(images?.[0]);
  return (
    <div className="flex flex-col sm:flex-row items-end">
      <div className="h-auto sm:order-2 order-1 w-full sm:w-3/4 overflow-hidden">
        <Image className="w-full h-auto scale-105 object-cover cursor-pointer duration-500 hover:scale-110" width={0} height={0} src={activeImage} alt=""/>
      </div>
      <div className="flex w-full sm:w-1/4 sm:order-1 order-2 flex-row sm:flex-col justify-end">
        {images.map(image => (
          <ImageButton
          className="w-1/4 sm:w-full duration-300"
            key={image}
            active={image===activeImage}
            onClick={() => setActiveImage(image)}>
            <Image className="object-cover w-full" src={image} width={0} height={0} alt=""/>
          </ImageButton>
        ))}
      </div>
    </div>
  );
}