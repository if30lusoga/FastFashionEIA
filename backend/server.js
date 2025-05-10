const express = require('express');
const app = express();
const PORT = 3000;

// This tells the server to start listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
