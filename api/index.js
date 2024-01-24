import express from 'express';

const app = express();

// Your express app configuration and routes go here

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
