import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

// console.clear();

const stan = nats.connect('ticketing', 'abs', {
  url: 'nats://3.109.184.167:4222/',
  verbose: true,
  reconnect: true,
  reconnectTimeWait: 5000, // wait 5 seconds before reconnect attempts
  maxReconnectAttempts: 5 // try to reconnect 5 times
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');
  new TicketCreatedListener(stan).listen();
});

stan.on('error', (err) => {
  console.error('Error connecting to NATS:', err);
});

stan.on('close', () => {
  console.log('NATS connection closed!');
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

// const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
//   url: 'http://13.200.8.169:4222/',
//   verbose: true,
//   reconnect: true,
//   reconnectTimeWait: 5000, // wait 5 seconds before reconnect attempts
//   maxReconnectAttempts: 2 // try to reconnect 5 times
// });
// console.log(stan);


