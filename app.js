const express = require('express');
const app = express();
const assignment1Routes = require('./routes/Assignment1routes');

app.use('/assignments', assignment1Routes);

const PORT = 9090;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
