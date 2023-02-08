async function getCryptoData() {
  const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
  const cryptoData = response.data;
  return cryptoData;
}

async function updateLeaderboard() {
  const cryptoData = await getCryptoData();
  const sortedData = cryptoData
    .sort((a, b) => (a.price_change_percentage_24h > b.price_change_percentage_24h ? -1 : 1))
    .slice(0, 15);

  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Ticker</th>
      <th>Name</th>
      <th>Price</th>
      <th>Price Growth</th>
    </tr>
  `;

  sortedData.forEach((crypto, index) => {
    const row = leaderboard.insertRow(-1);
    const rankCell = row.insertCell(0);
    const tickerCell = row.insertCell(1);
    const nameCell = row.insertCell(2);
    const priceCell = row.insertCell(3);
    const growthCell = row.insertCell(4);

    rankCell.innerHTML = index + 1;
    tickerCell.innerHTML = crypto.symbol.toUpperCase();
    nameCell.innerHTML = crypto.name;
    priceCell.innerHTML = `$${crypto.current_price}`;
    growthCell.innerHTML = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
  });
}

updateLeaderboard();
setInterval(updateLeaderboard, 30000);
