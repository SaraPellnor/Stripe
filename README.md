Webbshop-projekt med TypeScript, Express och React med Stripe Integration - SKOLPROJEKT

Översikt
Det här projektet är en enkel webbshop där användare kan bläddra bland produkter, lägga till dem i sin kundvagn och slutföra köp med hjälp av Stripe som betalningsgateway. Projektet är uppdelat i en klient och en server, där klienten bygger på React och servern på Express. TypeScript (TSX) används för att säkerställa typsäkerhet i hela applikationen.

Teknikstack
Klient

React: Frontend-ramverk för användargränssnittet.
TypeScript (TSX): Förbättrar kodens kvalitet och läsbarhet genom att lägga till statisk typning.
Stripe.js: Används för att hantera betalningar och kortuppgifter.

Server

Express: Backend-ramverk för att hantera begäranden och kommunicera med databasen.
Stripe API: Används för att skapa och hantera betalningar.

Installation och konfiguration

Klona projektet från GitHub-repot:

Öppna terminalen där du vill spara projektet
skriv in:
git clone https://github.com/din-anvandare/webbshop-projekt.git
öppna projektet i vs code

Installera klientens och serverns beroenden:

navigera till clientmappen i terminalen på vs code:
cd client
npm install

Öppna en till terminal och navigera till server:
cd server
npm install

Konfigurera Stripe API-nycklar:

Skapa ett Stripe-konto om du inte redan har ett.

I servermappen, skapa en .env-fil och lägg till dina Stripe API-nycklar:

env
Copy code
STRIPE_SECRET_KEY=your_secret_key

Kör projektet
Starta servern:


# I servermappen
npm run dev
Servern kommer att köras på port 3000.

Starta klienten:


# I client-mappen
npm run dev
Klienten kommer att köras på local host 5173 som standard.

Användning
Besök webbshoppen i din webbläsare på http://localhost:5173.

Utforska produkterna och lägg till dem i din kundvagn.

När du är redo att checka ut, följ betalningsinstruktionerna och använd Stripe för att slutföra köpet.
För att testa ett köp ange kortnr: 4242 4242 4242 4242 och CVC: 123


