       const nodemailer = require('nodemailer');

       app.post('/submit', async (req, res) => {
         const { email, firstName, lastName } = req.body;
         // Generate unique raffle number
         const raffleNumber = Math.floor(100000 + Math.random() * 900000); // e.g., 6-digit number
         
         // Store in database (pseudocode)
         await db.insert({ email, firstName, lastName, raffleNumber });
         
         // Send email
         const transporter = nodemailer.createTransport({
           service: 'SendGrid', // Or your provider
           auth: { user: 'your-username', pass: 'your-password' }
         });
         
         const mailOptions = {
           from: 'yourraffle@example.com',
           to: email,
           subject: 'Your Raffle Number for the Cancun Trip!',
           text: `Hello ${firstName} ${lastName},\nThank you for entering! Your raffle number is ${raffleNumber}. Good luck!`
         };
         
         transporter.sendMail(mailOptions, (error) => {
           if (error) {
             console.error(error);
             res.status(500).send('Error sending email');
           } else {
             res.redirect('/thank-you');
           }
         });
       });
       