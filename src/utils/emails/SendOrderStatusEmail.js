import transporter from "./EmailSender.js";
import OrderStatusEmailTemp from "./NewOrderTemp.js";
import Bull from "bull";

export let MailSender = new Bull("MailSender");

export default function SendOrderStatusEmail(subject, email, name, title, order_id, order_date, price) {
    return async () => {
        try {
            let { html, error } = OrderStatusEmailTemp(name, title, order_id, order_date, price);

            if (error) {
                throw new Error(error);
            }

            await transporter.sendMail({
                from: "BeetlePro",
                to: email,
                subject,
                html
            })

        } catch (error) {
            console.log(error.message);
        }
    }
}

MailSender.process(async (job) => {
    // const { orderId, newStatus, recipientEmail } = job.data;

    // Send the email
    // await sendEmail(recipientEmail, orderId, newStatus);
    console.log(job)
});

MailSender.on('completed', (job) => {
    // console.log(`Email sent for order ${job.data.orderId}`);
    console.log(job);
    MailSender.close();
});