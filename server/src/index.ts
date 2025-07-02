import { Server, Socket } from "socket.io";
import experss from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors'; 

const app = experss();
const server = http.createServer(app);
dotenv.config();

app.use(cors({
    origin: '*', // allow your frontend URLs
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

interface User {
    socketId: string;
    isPremium?: boolean;
    genderFilter?: string;
    voiceOnly?: boolean;
    joinTime?: number;
}

let waitingUsers: User[] = [];
const userPairs: Record<string, string> = {};
const userProfiles: Record<string, User> = {};

const matchUser = (socket: any, userProfile: User) => {
    if(!socket.id) return;

    // Find a compatible user in waiting list
    const compatibleUserIndex = waitingUsers.findIndex(waitingUser => {
        // Basic matching - if neither has gender filter, they can match
        if (!userProfile.genderFilter || userProfile.genderFilter === "any") {
            if (!waitingUser.genderFilter || waitingUser.genderFilter === "any") {
                return true;
            }
        }

        // If one has premium gender filter, check compatibility
        // For demo purposes, we'll just match any users
        // In real implementation, you'd need to store user gender info
        return true;
    });

    if (compatibleUserIndex !== -1) {
        const waitingUser = waitingUsers[compatibleUserIndex];

        // Remove from waiting list
        waitingUsers.splice(compatibleUserIndex, 1);

        // Create pair
        userPairs[socket.id] = waitingUser.socketId;
        userPairs[waitingUser.socketId] = socket.id;

        socket.emit("user:connect", waitingUser.socketId);

        console.log(`Matched ${socket.id} with ${waitingUser.socketId}`);
    } else {
        // Add to waiting list
        waitingUsers.push(userProfile);
        console.log(`${socket.id} is waiting for pair`);
    }
}

io.on('connection', (socket) => {
    console.log(`Socket connected ${socket.id}`);

    // Handle user profile setup
    socket.on("user:profile", (profile: { isPremium?: boolean; genderFilter?: string; voiceOnly?: boolean }) => {
        const userProfile: User = {
            socketId: socket.id,
            isPremium: profile.isPremium || false,
            genderFilter: profile.genderFilter || "any",
            voiceOnly: profile.voiceOnly || false,
            joinTime: Date.now()
        };

        userProfiles[socket.id] = userProfile;
        matchUser(socket, userProfile);
    });

    // Default matching for users without profile
    const defaultProfile: User = {
        socketId: socket.id,
        isPremium: false,
        genderFilter: "any",
        voiceOnly: false,
        joinTime: Date.now()
    };
    userProfiles[socket.id] = defaultProfile;
    matchUser(socket, defaultProfile);

    // socket.on("user:connect", ({remoteId}) => {
    //     console.log("user:connect backend");
    //     io.to(remoteId).emit("user:connect", {remoteId: socket.id});
    // })

    socket.on("offer", ({offer, to}) => {
        // console.log(`Recieved Offer from ${socket.id} to ${to}`);
        io.to(to).emit("offer", {offer, from: socket.id});
    });

    socket.on("answer", ({answer, to}) => {
        // console.log(`Recieved answer from ${socket.id} to ${to}`);
        io.to(to).emit("answer", {answer, from: socket.id});
    })

    socket.on("peer:nego:needed", ({offer, to}) => {
        // console.log("nego needed")
        io.to(to).emit("peer:nego:needed", { offer, from: socket.id });
    });

    socket.on("peer:nego:done", ({answer, to}) => {
        // console.log("nego done")
        io.to(to).emit("peer:nego:final", {answer, to: socket.id});
    });

    socket.on("ice-candidate", ({candidate, targetChatToken}) => {
        // console.log(`Sending ICE candidate from ${socket.id} to ${targetChatToken}`);
        io.to(targetChatToken).emit("ice-candidate", {candidate, sourceChatToken: socket.id});
    });

    socket.on("send:message", ({message, targetChatToken}) => {
        // console.log(`Message from ${socket.id} to ${targetChatToken}: ${message}`);
        io.to(targetChatToken).emit("message:recieved", {message, sourceChatToken: socket.id});
    });

    socket.on("send:premium:status", ({isPremium, targetChatToken}) => {
        // console.log(`Premium status from ${socket.id} to ${targetChatToken}: ${isPremium}`);
        io.to(targetChatToken).emit("partner:premium:status", {isPremium, sourceChatToken: socket.id});
    });

    socket.on("skip", () => {
        const partnerId = userPairs[socket.id];

        if (partnerId) {
            io.to(partnerId).emit("skipped");
            delete userPairs[socket.id];
            delete userPairs[partnerId];

            // Re-match both users
            const partnerSocket = io.sockets.sockets.get(partnerId);
            if (partnerSocket) {
                const partnerProfile = userProfiles[partnerId];
                if (partnerProfile) {
                    matchUser(partnerSocket, partnerProfile);
                }
            }
        }

        // Re-match current user
        const currentProfile = userProfiles[socket.id];
        if (currentProfile) {
            matchUser(socket, currentProfile);
        }
    });

    socket.on("disconnect", () => {
        const partnerId = userPairs[socket.id];

        if(partnerId){
            io.to(partnerId).emit("partnerDisconnected");
            delete userPairs[socket.id];
            delete userPairs[partnerId];

            const partnerSocket = io.sockets.sockets.get(partnerId);
            if (partnerSocket) {
                const partnerProfile = userProfiles[partnerId];
                if (partnerProfile) {
                    matchUser(partnerSocket, partnerProfile);
                }
            }
        }

        // Remove from waiting list
        waitingUsers = waitingUsers.filter(user => user.socketId !== socket.id);

        // Clean up user profile
        delete userProfiles[socket.id];
    })
})

app.get('/', (req, res) => {
    // console.log(`Server is running...`);
    res.send("Server is running...")
})


const PORT = process.env.PORT || 8000;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});