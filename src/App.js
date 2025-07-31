import React, { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState("-");
  const [signal, setSignal] = useState("-");
  const [reason, setReason] = useState("-");

  useEffect(() => {
    fetch("https://api.bitget.com/api/v2/market/ticker?symbol=BTCUSDT")
      .then((res) => res.json())
      .then((data) => {
        const close = parseFloat(data.data.close);
        const ema9 = close * 0.95;
        const ema21 = close * 0.98;

        setPrice(close.toFixed(2));

        if (ema9 > ema21) {
          setSignal("BUY");
          setReason("EMA 9 di atas EMA 21");
        } else if (ema9 < ema21) {
          setSignal("SELL");
          setReason("EMA 9 di bawah EMA 21");
        } else {
          setSignal("-");
          setReason("Netral");
        }
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>📈 Crypto Analyzer (BTC/USDT)</h1>
      <h2>Harga: ${price}</h2>
      <h2>Sinyal: {signal}</h2>
      <p>Alasan: {reason}</p>
    </div>
  );
}

export default App;
