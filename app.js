const express = require('express');
const app = express();
const ass2Routes = require('./routes/Assignment2routes');

app.use('/assignments', ass2Routes);

const PORT = 9090;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
