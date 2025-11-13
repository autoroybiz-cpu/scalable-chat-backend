const express = require('express');
const cors = require('cors');

const app = express();

// מאפשרים JSON בבקשות
app.use(express.json());

// CORS - כרגע פתוח לכולם (אפשר לצמצם בהמשך לדומיין של ה-UI)
app.use(cors());

// נקודת בריאות לבדיקה (אופציונלי)
app.get('/', (req, res) => {
res.json({ status: 'ok', service: 'auth' });
});

// /login - אימות בסיסי
app.post('/login', (req, res) => {
const { username, password } = req.body;

// דמו: משתמש יחיד
if (username === 'roy' && password === '123') {
return res.json({ token: 'dummy-token-123' });
}

return res.status(401).json({ error: 'Invalid credentials' });
});

// פורט: או מהסביבה (לענן) או 3000 (לוקאל)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Auth service running on port ${PORT}`);
});
