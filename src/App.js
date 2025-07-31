import React, { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState(null);
  const [signal, setSignal] = useState("-");
  const [reason, setReason] = useState("-");

  useEffect(() => {
    fetch("https://api.bitget.com/api/v2/market/ticker?symbol=ETHUSDT")
      .then((res) => res.json())
      .then((data) => {
        const close = parseFloat(data.data.close);
        const ema9 = close * 0.95;
        const ema21 = close * 0.98;

        setPrice(close);

        if (ema9 > ema21) {
          setSignal("BUY");
          setReason("EMA 9 berada di atas EMA 21");
        } else if (ema9 < ema21) {
          setSignal("SELL");
          setReason("EMA 9 berada di bawah EMA 21");
        } else {
          setSignal("-");
          setReason("-");
        }
      });
  }, []);

  return (
    <div>
      <h1 style={{ color: "#4fc3f7" }}>Bitget Analyzer</h1>
      <p>Harga: {price}</p>
      <p>Sinyal: {signal}</p>
      <p>Alasan: {reason}</p>
    </div>
  );
}

export default App;