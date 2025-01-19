// JavaScript source code
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// הגדרת שירות המיילים
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'כתובת המייל שלך@gmail.com',
        pass: 'סיסמת האפליקציה'
    }
});

// קבלת המידע ושליחה למייל
app.post('/send-email', (req, res) => {
    const { name, phone, need } = req.body;

    const mailOptions = {
        from: 'כתובת המייל שלך@gmail.com',
        to: 'idodomis2009@gmail.com',
        subject: 'בקשה חדשה מהאתר',
        text: `שם: ${name}\nטלפון: ${phone}\nצורך: ${need}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'שליחה נכשלה, נסה שוב מאוחר יותר.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'הבקשה נשלחה בהצלחה!' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
    // הצגת דף המידע כברירת מחדל (כשמעבירים את הדף או עושים ריפרש)
    const defaultSection = document.getElementById('info');
    defaultSection.classList.add('active');

    // ניווט בין דפים
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // מונע את הניווט הרגיל
            const targetSection = document.getElementById(link.getAttribute('data-section'));

            sections.forEach(section => {
                section.classList.remove('active');
            });

            targetSection.classList.add('active');
        });
    });
});
