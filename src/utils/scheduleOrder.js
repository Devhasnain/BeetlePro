import schedule from 'node-schedule';

const rule = new schedule.RecurrenceRule();
rule.minute = 1;

export function scheduleOrderJob() {
    schedule.scheduleJob('*/1', async () => {

        console.log('activated')
        // try {
        //     order.status = 'pending';
        //     order.sender_order_status = 'active'
        //     await order.save();
        //     console.log(`Order ${order._id} status updated to Active at ${new Date()}`);
        // } catch (err) {
        //     console.error(`Error updating order ${order._id} status: ${err.message}`);
        // }
    });
};