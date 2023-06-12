const express = require('express');
const userRoutes = require('./routers/userrouter');
const noteRoutes = require('./routers/noterouter');
const { createUserTable, createNotesTable } = require('./postgres/tables');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: '*'
  }));

app.get('/', (req, res) => {
    res.send('Hello World')
});
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(port, async () => {
    console.log('Server is up on port ' + port)
    await createUserTable();
    await createNotesTable();
})