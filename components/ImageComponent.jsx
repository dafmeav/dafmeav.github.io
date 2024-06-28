// src/components/ImageComponent.jsx
import React from 'react';
import exampleImage from '../images/peru.png'; // 画像ファイルのパスを指定
import './ImageComponent.css'; // CSSファイルをインポート

const ImageComponent = () => {
  return (
    <div>
      <h1>画像を表示する例</h1>
      <img 
        src={exampleImage} 
        alt="Example" 
        className="example-image" // CSSクラスを適用
      />
    </div>
  );
};

export default ImageComponent;
