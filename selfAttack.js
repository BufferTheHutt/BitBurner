/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    var threats = ns.args[1];

    // Überprüfen, ob wir Root-Zugriff auf den Zielserver haben, falls nicht, versuchen, ihn zu erlangen
    if (!ns.hasRootAccess(target)) {
        if (ns.fileExists("BruteSSH.exe", "home")) {
            await ns.brutessh(target);
        }
        if (ns.fileExists("FTPCrack.exe", "home")) {
            await ns.ftpcrack(target);
        }
        if (ns.fileExists("HTTPWorm.exe", "home")) {
            await ns.httpworm(target);
        }
        if (ns.fileExists("SQLInject.exe", "home")) {
            await ns.sqlinject(target);
        }
        if (ns.fileExists("relaySMTP.exe", "home")) {
            await ns.relaysmtp(target);
        }
        if (ns.fileExists("NUKE.exe", "home")) {
            await ns.nuke(target);
        }
    }

    //gimme-money auf Zielserver kopieren
    if(!ns.fileExists(target)){
      ns.scp("gimme-money.js", target, "home")
    }

    // Wenn Root-Zugriff auf den Zielserver vorhanden, führen wir gimme-money.js auf dem Home-Server aus
    if (ns.hasRootAccess(target)) {
        ns.exec("gimme-money.js", target, threats, target);
        ns.tprint(`gimme-money.js wurde mit ${threats} Threads auf ${target} gestartet, um das Ziel ${target} anzugreifen.`);
    } else {
        ns.tprint(`Konnte keinen Root-Zugriff auf ${target} erhalten.`);
    }
}
