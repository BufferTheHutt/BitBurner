/** @param {NS} ns */
export async function main(ns) {
    // Zielserver als Argument übergeben
    const server = ns.args[0];
    // Scanergebnisse werden als Array in Variable gespeichert
    let scanResult = ns.scan(server);
    ns.tprint(scanResult);
    
    // Versuche, Root-Zugriff für die gescannten Server zu erlangen und gleichzeitig gimme-money.js zu starten
    for (let result of scanResult) {
        if (!ns.hasRootAccess(result)) {
            await ns.brutessh(result);
            await ns.ftpcrack(result);
            ns.nuke(result);
        }
        else if (ns.hasRootAccess(result) && !ns.isRunning("gimme-money.js", result)) {
            // Wenn der Root-Zugriff erfolgreich ist, starte das gimme-money.js Skript
            ns.tprint(`Root-Zugriff auf ${result} erfolgreich! Starte gimme-money.js.`);
            ns.run("gimme-money.js", 1, result);
        }
    }
}
