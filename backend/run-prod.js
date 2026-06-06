try {
  console.log("BOOTSTRAP: Starting production server using run-prod.js...");
  require('./dist/src/main.js');
  console.log("BOOTSTRAP: main.js loaded successfully.");
} catch (err) {
  console.error("FATAL ERROR: NestJS crashed during bootstrap:", err);
  process.exit(1);
}
