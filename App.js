import React, { useState, useEffect } from 'react';
import './App.css';
import imageA from './images/chicken.png';
import imageB from './images/egg.png';
import imageC from './images/rice.png';
import imageD from './images/ketchup.png';
import imageE from './images/cookedchicken.png';
import imageF from './images/cookedegg.png';
import imageG from './images/cookedrice.png';
import imageH from './images/Omeletterice.png';

function App() {
  const [gasSwitch, setGasSwitch] = useState(false);
  const [electricitySwitch, setElectricitySwitch] = useState(false);
  const [gasAmount, setGasAmount] = useState(25); // ガスの初期値
  const [electricityAmount, setElectricityAmount] = useState(8); // 電気の初期値
  const [coolTime, setCoolTime] = useState(0); // クールタイムの初期値
  const [riceCooking, setRiceCooking] = useState(false); // 米が炊ける状態を管理
  const [coolingMessage, setCoolingMessage] = useState(''); // クールタイム中のメッセージ
  const [score, setScore] = useState(0); // スコア（作成したオムライスの数）
  const [gameOver, setGameOver] = useState(false); // ゲームオーバーのフラグ
  const [timer, setTimer] = useState(100); // 制限時間（秒）

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setTimer(prevTimer => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (timer <= 0) {
      setGameOver(true);
    }
  }, [timer]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gasSwitch && gasAmount > 0) {
        setGasAmount(prevAmount => prevAmount - 1);
      } else if (gasAmount <= 0) {
        setGasSwitch(false);
      }

      if (electricitySwitch && electricityAmount > 0) {
        setElectricityAmount(prevAmount => prevAmount - 1);
      } else if (electricityAmount <= 0) {
        setElectricitySwitch(false);
      }

      if (coolTime > 0) {
        setCoolTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gasSwitch, electricitySwitch, gasAmount, electricityAmount, coolTime]);

  useEffect(() => {
    if (coolTime > 0) {
      setCoolingMessage('クールタイム中です');
    } else {
      setCoolingMessage('');
    }
  }, [coolTime]);

  const toggleGasSwitch = () => {
    if (gasAmount > 0) setGasSwitch(prevState => !prevState);
  };

  const toggleElectricitySwitch = () => {
    if (electricityAmount > 0) setElectricitySwitch(prevState => !prevState);
  };

  const [imageCounts, setImageCounts] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  });

  const handleCookChicken = () => {
    if (imageCounts.a > 0) {
      setImageCounts(prevCounts => ({
        ...prevCounts,
        a: Math.max(prevCounts.a - 1, 0),
        e: prevCounts.e + 1,
      }));
      setCoolTime(5); // クールタイムを5秒に設定
      console.log("チキンを調理します");
    }
  };

  const handleCookRice = () => {
    if (imageCounts.c > 0 && !riceCooking) {
      setImageCounts(prevCounts => ({
        ...prevCounts,
        c: Math.max(prevCounts.c - 1, 0),
      }));
      setRiceCooking(true); // 米が炊ける状態を開始
      setTimeout(() => {
        setImageCounts(prevCounts => ({
          ...prevCounts,
          g: prevCounts.g + 1,
        }));
        setRiceCooking(false); // 米が炊ける状態を終了
        console.log("米が炊きあがりました");
      }, 20000); // 20秒後に米が炊きあがる
      console.log("米を炊きます");
    }
  };

  const handleCookEgg = () => {
    if (imageCounts.b > 0) {
      setImageCounts(prevCounts => ({
        ...prevCounts,
        b: Math.max(prevCounts.b - 1, 0),
        f: prevCounts.f + 1,
      }));
      setCoolTime(3); // クールタイムを3秒に設定
      console.log("卵を調理します");
    }
  };

  const handleMakeOmeletteRice = () => {
    if (imageCounts.e > 0 && imageCounts.f > 0 && imageCounts.g > 0 && imageCounts.d > 0) {
      setImageCounts(prevCounts => ({
        ...prevCounts,
        e: Math.max(prevCounts.e - 1, 0),
        f: Math.max(prevCounts.f - 1, 0),
        g: Math.max(prevCounts.g - 1, 0),
        d: Math.max(prevCounts.d - 1, 0),
        h: prevCounts.h + 1,
      }));
      setCoolTime(5); // クールタイムを5秒に設定
      console.log("オムライスを作ります");
    }
  };

  const handleShopping = () => {
    if (coolTime === 0) {
      setCoolTime(5); // 買い物のクールタイムを5秒に設定
      setImageCounts(prevCounts => ({
        ...prevCounts,
        a: prevCounts.a + Math.floor(Math.random() * 2), // 0または1個増加
        b: prevCounts.b + Math.floor(Math.random() * 2), // 0または1個増加
        c: prevCounts.c + Math.floor(Math.random() * 2), // 0または1個増加
        d: prevCounts.d + Math.floor(Math.random() * 2), // 0または1個増加
      }));
      console.log("買い物をしました");
    }
  };

  const images = [
    { src: imageA, count: imageCounts.a, label: 'A' },
    { src: imageB, count: imageCounts.b, label: 'B' },
    { src: imageC, count: imageCounts.c, label: 'C' },
    { src: imageD, count: imageCounts.d, label: 'D' },
    { src: imageE, count: imageCounts.e, label: 'E' },
    { src: imageF, count: imageCounts.f, label: 'F' },
    { src: imageG, count: imageCounts.g, label: 'G' },
    { src: imageH, count: imageCounts.h, label: 'H' },
  ];

  useEffect(() => {
    if (gameOver) {
      // ゲーム終了時の処理（スコアを表示など）
      console.log(`ゲーム終了！スコア: ${imageCounts.h}`);
    }
  }, [gameOver, imageCounts.h]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>COOKING TAROU with React</h1>
        <div className="cooling-message">{coolingMessage}</div>
        <div className="timer">制限時間: {timer}秒</div>
      </header>
      <div className="image-container">
        {images.map((image, index) => (
          Array.from({ length: image.count }).map((_, i) => (
            <img 
              key={`${index}-${i}`} 
              src={image.src} 
              alt={`Image ${index + 1} - ${i + 1}`} 
              className="example-image" 
            />
          ))
        ))}
      </div>
      <div className="switch-container">
        <button className={`switch ${gasSwitch ? 'on' : 'off'}`} onClick={toggleGasSwitch}>
          ガススイッチ: {gasSwitch ? 'オン' : 'オフ'}
        </button>
        <span className="switch-amount">残り: {gasAmount}</span>
        <button className={`switch ${electricitySwitch ? 'on' : 'off'}`} onClick={toggleElectricitySwitch}>
          電気スイッチ: {electricitySwitch ? 'オン' : 'オフ'}
        </button>
        <span className="switch-amount">残り: {electricityAmount}</span>
      </div>
      <div className="button-container">
        <button 
          className="action-button" 
          onClick={handleCookChicken} 
          disabled={!gasSwitch || imageCounts.a <= 0 || coolTime > 0}
        >
          チキンを調理
        </button>
        <button 
          className="action-button" 
          onClick={handleCookRice} 
          disabled={!electricitySwitch || imageCounts.c <= 0 || riceCooking || coolTime > 0}
        >
          米を炊く
        </button>
        <button 
          className="action-button" 
          onClick={handleCookEgg} 
          disabled={!gasSwitch || imageCounts.b <= 0 || coolTime > 0}
        >
          卵を調理
        </button>
        <button 
          className="action-button" 
          onClick={handleMakeOmeletteRice} 
          disabled={!gasSwitch || imageCounts.e <= 0 || imageCounts.f <= 0 || imageCounts.g <= 0 || imageCounts.d <= 0 || coolTime > 0}
        >
          オムライスを作る
        </button>
        <button 
          className="action-button" 
          onClick={handleShopping} 
          disabled={coolTime > 0}
        >
          買い物
        </button>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>ゲーム終了！スコア: {imageCounts.h}</h2>
        </div>
      )}
    </div>
  );
}

export default App;

