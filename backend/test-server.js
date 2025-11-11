// Simple Server Test
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!', port: PORT });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`   Test it: curl http://localhost:${PORT}/test`);
});

