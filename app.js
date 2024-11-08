const express = require('express');
const app = express();
const assignmentRoutes = require('./routes/Assignment3routes');

app.use('/assignments', assignmentRoutes);

const PORT = 9090;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
