/** @param {NS} ns */
export async function main(ns) {

    // Informationen über alle Aktien beschaffen
    let allStocks = ns.stock.getSymbols();
    let ownedStocks = {}; // Zum Verfolgen der Aktienbestände

    while (true) {
        for (let sym of allStocks) {
            // Vorhersage für die aktuelle Aktie erhalten
            let stockForecast = ns.stock.getForecast(sym);
            let stockPrice = ns.stock.getPrice(sym);
            let maxShares = ns.stock.getMaxShares(sym); // Maximal verfügbare Aktien pro Symbol

            // Informationen ausgeben
            ns.print(`Symbol: ${sym}, Vorhersage: ${stockForecast}`);

            // Überprüfen, ob Aktien gehalten werden
            if (sym in ownedStocks && ownedStocks[sym] > 0) {
                // Wenn Vorhersage unter 0.6 fällt, verkaufen
                if (stockForecast <= 0.56) {
                    ns.stock.sellStock(sym, ownedStocks[sym]);
                    ns.print(`Verkauft: ${sym}, Menge: ${ownedStocks[sym]}`);
                    ownedStocks[sym] = 0; // Bestände zurücksetzen
                }
            }

            // Wenn Vorhersage über 0.8, Aktien kaufen
            if (stockForecast > 0.72) {
                let availableMoney = ns.getServerMoneyAvailable("home") * 0.60;
                let maxAffordableAmount = Math.floor(availableMoney / stockPrice); // Menge, die du dir leisten kannst
                
                // Menge der Aktien auf die maximal verfügbare Menge beschränken
                let amountToBuy = Math.min(maxAffordableAmount, maxShares);
                
                if (amountToBuy > 0) {
                    ns.stock.buyStock(sym, amountToBuy);
                    ns.print(`Gekauft: ${sym}, Menge: ${amountToBuy}`);
                    ownedStocks[sym] = (ownedStocks[sym] || 0) + amountToBuy; // Bestände aktualisieren
                }
                
                ns.print(`Menge, die verfügbar ist: ${maxShares}`);
                ns.print(`Menge, die gekauft wird: ${amountToBuy}`);
                ns.print(`maximale Menge, die gekauft werden kann: ${maxAffordableAmount}`);
            }
        }
        // Wartezeit von 60 Sekunden, um nicht zu viele Anfragen zu senden
        await ns.sleep(25000);
    }
}
