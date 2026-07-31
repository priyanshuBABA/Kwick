import dns from 'dns/promises';
import net from 'net';

const SRV_NAME = '_mongodb._tcp.cluster0.vtsvpsi.mongodb.net';

const timeoutMs = 5000;

async function tryConnect(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let done = false;
    const onResult = (err) => {
      if (done) return;
      done = true;
      socket.destroy();
      resolve({ host, port, ok: !err, err: err ? err.message : null });
    };

    socket.setTimeout(timeoutMs, () => onResult(new Error('timeout')));
    socket.once('error', onResult);
    socket.once('connect', () => onResult());
    socket.connect(port, host);
  });
}

(async () => {
  console.log('Starting SRV resolution and TCP checks for', SRV_NAME);
  try {
    const records = await dns.resolveSrv(SRV_NAME);
    console.log('SRV records:', records);

    for (const r of records) {
      try {
        console.log('\nChecking target:', r.name, 'port', r.port || 27017);
        // Resolve A/AAAA
        try {
          const addrs = await dns.resolve(r.name);
          console.log('Resolved addresses:', addrs);
          for (const a of addrs) {
            const res = await tryConnect(a, r.port || 27017);
            console.log('TCP result for', a, ':', res);
          }
        } catch (e) {
          console.log('Address resolution failed for', r.name, '-', e.message);
        }

      } catch (e) {
        console.log('Error checking record', r, e.message);
      }
    }
  } catch (err) {
    console.error('SRV resolution failed:', err.message);
  }
})();
