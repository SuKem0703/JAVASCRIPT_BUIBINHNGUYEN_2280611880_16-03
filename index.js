require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Đã kết nối thành công với MongoDB Atlas'))
    .catch((err) => console.error('Lỗi kết nối database:', err));

const UserSchema = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/add', async (req, res) => {
    try {
        const sampleName = 'User_' + Math.floor(Math.random() * 1000);
        const newUser = new User({ name: sampleName });
        await newUser.save();
        res.json({ message: 'Đã thêm user thành công', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại cổng ${port}`);
});
