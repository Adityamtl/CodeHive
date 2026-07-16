import cron from 'node-cron';
import { Room } from '../models/Room.model.js';
import { User } from '../models/User.model.js';

// Schedule the cleanup job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    try {
        // Find all rooms that have expired (i.e., deleted automatically via TTL)
        const deletedRooms = await Room.find({
            createdAt: { $lt: new Date(Date.now() - (2 * 60 * 60 * 1000 + 50 * 60 * 1000)) } // 2:50 hours ago
        }).select('_id');

        if (deletedRooms.length > 0) {
            const deletedRoomIds = deletedRooms.map(room => room._id.toString());

            // Clean up the User model: remove deleted room IDs from the users' rooms array
            await User.updateMany(
                { rooms: { $in: deletedRoomIds } },
                { $pull: { rooms: { $in: deletedRoomIds } } }
            );

            console.log(`Cleaned up rooms from users' arrays for rooms: ${deletedRoomIds}`);
        }
        console.log("Cleanup executed");
    } catch (error) {
        console.error('Error in cron job:', error);
    }
})