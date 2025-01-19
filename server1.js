// JavaScript source code
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// ����� ����� �������
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '����� ����� ���@gmail.com',
        pass: '����� ���������'
    }
});

// ���� ����� ������ �����
app.post('/send-email', (req, res) => {
    const { name, phone, need } = req.body;

    const mailOptions = {
        from: '����� ����� ���@gmail.com',
        to: 'idodomis2009@gmail.com',
        subject: '���� ���� �����',
        text: `��: ${name}\n�����: ${phone}\n����: ${need}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: '����� �����, ��� ��� ����� ����.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: '����� ����� ������!' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
    // ���� �� ����� ������ ���� (��������� �� ��� �� ����� �����)
    const defaultSection = document.getElementById('info');
    defaultSection.classList.add('active');

    // ����� ��� ����
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // ���� �� ������ �����
            const targetSection = document.getElementById(link.getAttribute('data-section'));

            sections.forEach(section => {
                section.classList.remove('active');
            });

            targetSection.classList.add('active');
        });
    });
});
