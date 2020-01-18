const socket = require('socket.io-client')('https://madxkk-rc-server.glitch.me/master');
socket.on('connect', () => {
  console.log('Connected as master');
  socket.emit('update', { type: 'selectslave', data: { slaveid: 'v1q8j6Mp4ExjcPMBAAAI' } })
  setTimeout(() => {
    socket.emit('update', { type: 'openurl', data: { url: 'https://os-system.com' } });
    // socket.emit('update', { type: 'dclick'});
    socket.emit('update', { type: 'movemouse', data: { x: 200, y: 200 } });
    socket.emit('update', { type: 'movemouse', data: { x: 200, y: 300 } });
    socket.emit('update', { type: 'movemouseover' });
  }, 1000)
  // socket.emit('update', { type: 'movemouse', data: {
  //   x: 150,
  //   y: 250,
  // }});
  // socket.emit('update', { type: 'movemouse', data: {
  //   x: 250,
  //   y: 350,
  // }});
});
socket.on('slaves', (data) => {
  console.log(data);
});
socket.on('keyboard', () => {
  console.log('show keyboard');
})
socket.on('disconnect', () => {
  console.log('dc');
});
