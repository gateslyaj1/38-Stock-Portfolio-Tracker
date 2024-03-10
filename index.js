const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', investments: [] },
  // 添加更多用户数据...
];

// 处理获取用户投资信息的请求
app.get('/investments/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ investments: user.investments });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新投资的请求
app.post('/investments/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { stockSymbol, quantity, purchasePrice } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newInvestment = { id: user.investments.length + 1, stockSymbol, quantity, purchasePrice };
    user.investments.push(newInvestment);
    res.json({ message: 'Investment added successfully', investment: newInvestment });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理分析投资表现的请求（示例，实际应用中可能需要更复杂的逻辑）
app.get('/analyze/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // 示例：计算投资总价值和盈亏
    const totalValue = user.investments.reduce((sum, investment) => {
      // 在实际应用中，可能需要调用股票数据API来获取实时股价
      // 这里仅作为示例，使用固定的股价
      const currentStockPrice = 100; // 替换为实际股价
      return sum + investment.quantity * currentStockPrice;
    }, 0);

    const totalInvestment = user.investments.reduce((sum, investment) => sum + investment.purchasePrice, 0);
    const profitLoss = totalValue - totalInvestment;

    res.json({ totalValue, totalInvestment, profitLoss });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
