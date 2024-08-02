/** @param {NS} ns */
export async function main(ns) {
    // Zielserver als Argument übergeben
    const server = ns.args[0];
    let minSeclvl = ns.getServerMinSecurityLevel(server);
    let currentSeclvl = ns.getServerSecurityLevel(server);
    let maxMoney = ns.getServerMaxMoney(server);
    let currentMoney = ns.getServerMoneyAvailable(server);

    // Ausgabe
    ns.tprint(`Das Ziel ist ${server}`);
    ns.tprint(`Minimale Sicherheitsstufe: ${minSeclvl}`);
    ns.tprint(`Aktuelle Sicherheitsstufe: ${currentSeclvl}`);
    ns.tprint(`Maximales Geld: ${maxMoney}`);
    ns.tprint(`Aktuelles Geld: ${currentMoney}`);
    ns.tprint(`Weaken Analyse: ${ns.weakenAnalyze(1)}`);

}