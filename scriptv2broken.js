<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";
      const tableBody = document.querySelector("#leaderboard tbody");

      axios.get(API_URL)
        .then(function (response) {
          const data = response.data;

          data.forEach(function (coin, index) {
            const rank = index + 1;
            const symbol = coin.symbol;
            const price = coin.current_price;
            const priceChange = coin.price_change_percentage_24h;

            const row = `
              <tr>
                <td>${rank}</td>
                <td>${symbol}</td>
                <td>$${price.toFixed(2)}</td>
                <td>${priceChange.toFixed(2)}%</td>
              </tr>
            `;

            tableBody.innerHTML += row;
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    </script>
  </head>
  <body>
    <h1>Cryptocurrency Leaderboard</h1>
    <table id="leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Price Change (24h)</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </body>
</html>

