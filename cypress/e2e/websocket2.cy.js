describe("Test Cypress pour Prodraft", () => {
  it("Sélectionne différents champions avec les liens bleus et rouges selon la séquence spécifiée", () => {
    const sequence = [
      3, 4, 3, 4, 3, 4, 1, 2, 2, 1, 1, 2, 4, 3, 4, 3, 2, 1, 1, 2,
    ];

    const champions = [
      "Aatrox",
      "Ahri",
      "Akali",
      "Alistar",
      "Amumu",
      "Anivia",
      "Annie",
      "Aphelios",
      "Ashe",
      "Azir",
      "Bard",
      "Blitzcrank",
      "Brand",
      "Braum",
      "Caitlyn",
      "Camille",
      "Cassiopeia",
      "Corki",
      "Darius",
      "Diana",
    ];

    let currentIndex = 0;

    sequence.forEach((action) => {
      const isBlue = action === 1 || action === 3;
      const link =  "abcdefg_blue";

      cy.visit(`http://localhost:3001/prodraft/${link}`);
      const champion = champions[currentIndex];
      cy.contains(".grid-cols-6 > div", champion)
          .should("not.have.class", "opacity-15")
          .click();


      cy.contains(".flex-col.items-center.text-white", champion)
          .should('have.class', 'opacity-15');

      currentIndex++;
    });
  });
});
