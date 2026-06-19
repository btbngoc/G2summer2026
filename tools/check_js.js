try {
  require('../assets/app.js');
  console.log('OK');
} catch (e) {
  console.error('ERROR', e && e.message);
  process.exit(1);
}
