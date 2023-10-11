import schedule from 'node-schedule';
// import cron from 'node-cron';

let scheduledJob = null;

const scheduled_time = new Date();
scheduled_time.setMinutes(scheduled_time.getMinutes() + 1);

const scheduledDate = new Date(scheduled_time);
const year = scheduledDate.getFullYear();
const month = scheduledDate.getMonth() + 1; // Month is zero-indexed
const day = scheduledDate.getDate();
const hour = scheduledDate.getHours();
const minute = scheduledDate.getMinutes();

const cronExpression = `${minute}`
//  `${0} ${minute} ${hour} ${day} ${month} ${year}`;

export function scheduleOrderJob() {
    console.log(cronExpression)
    return scheduledJob = schedule.scheduleJob(cronExpression, async () => {
        console.log('activated')
        // try {
        //     order.status = 'pending';
        //     order.sender_order_status = 'active'
        //     await order.save();
        //     console.log(`Order ${order._id} status updated to Active at ${new Date()}`);
        // } catch (err) {
        //     console.error(`Error updating order ${order._id} status: ${err.message}`);
        // }
        if (scheduledJob) {
            scheduledJob.cancel();
            console.log('Cron job has been canceled.');
        }
    });

    // scheduledJob = cron.schedule(cronExpression, () => {
    //     console.log('activated');

    //     // if (scheduledJob) {
    //     //     scheduledJob.cancel();
    //     //     console.log('Cron job has been canceled.');
    //     // }
    // })
};