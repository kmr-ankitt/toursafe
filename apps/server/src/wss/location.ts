import { io } from "..";

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('location', (data: { name: string; latitude: number; longitude: number }) => {
    console.log('Location received:', data);
    socket.emit('locationResponse', {
      message: `Received location for ${data.name}`,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    socket.broadcast.emit('locationUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
