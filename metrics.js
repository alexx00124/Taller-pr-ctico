// metrics.js
const axios = require("axios");

async function checkEndpoint(url) {
  try {
    const start = Date.now();
    const response = await axios.get(url);
    const end = Date.now();

    const latency = end - start;

    console.log("🔎 Análisis del endpoint:", url);
    console.log("✅ Código de estado:", response.status);
    console.log("⏱️ Tiempo de respuesta:", latency, "ms");

    // Revisar cabeceras de seguridad
    const headers = response.headers;
    const securityHeaders = [
      "strict-transport-security",
      "content-security-policy",
      "x-frame-options",
      "x-content-type-options",
      "referrer-policy"
    ];

    console.log("\n🔐 Validación de cabeceras de seguridad:");
    securityHeaders.forEach(header => {
      if (headers[header]) {
        console.log(`✔️ ${header}: ${headers[header]}`);
      } else {
        console.log(`❌ ${header}: No configurado`);
      }
    });

  } catch (error) {
    if (error.response) {
      console.error("❌ Error en la respuesta:", error.response.status);
    } else {
      console.error("❌ Error al conectar:", error.message);
    }
  }
}

// Ejecutar script
const url = process.argv[2]; // leer desde línea de comandos
if (!url) {
  console.log("Uso: node metrics.js <URL>");
  process.exit(1);
}

checkEndpoint(url);
