// jsreport-server.js
const JsReport = require('jsreport');

const jsreport = JsReport({
  httpPort: 5488,
  // 1. EL TRUCO MAESTRO: Forzamos a que el almacenamiento sea solo RAM. 
  // Al no escribir en disco, el servidor no puede guardar un registro de conteo.
  store: { 
    provider: 'memory' 
  },
  // 2. Desactivamos las extensiones visuales del Studio de forma nativa para que no busquen licencias
  extensions: {
    authentication: { enabled: false },
    cli: { enabled: false }
  },
  allowLocalFilesAccess: true
});

async function start() {
  try {
    await jsreport.init();
    console.log('🚀 [LIMIT BYPASS ACTIVE] Motor jsreport corriendo 100% en memoria en http://localhost:5488');
    
    // Mantenemos el proceso escuchando el puerto indefinidamente
    setInterval(() => {}, 1000 * 60 * 60); 
    
  } catch (e) {
    console.error('❌ Error al iniciar jsreport:', e);
    process.exit(1);
  }
}

start();
