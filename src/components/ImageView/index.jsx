"use client";
import { Image } from 'antd';
import NextImage from 'next/image';

import image1 from "../../../assets/Images/860164-nature-wallpaper.jpg";

const ImageView = () => {
  return (
    <>
      <h3>antd image component</h3>
      <Image
        width={200}
        alt="Image"
        src={image1.src}
      />

      <br />
      <br />
      <h3>next js image component</h3>
      <NextImage
        width={200}
        alt="Image"
        src={image1}
      />
    </>
  );
};

export default ImageView;
