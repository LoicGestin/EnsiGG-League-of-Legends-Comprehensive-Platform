describe("ProdraftLink page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/prodraft");
  });

  it("should navigate to the correct Blue Picks & Bans Link", () => {
    cy.get(".link-rect1 a").click();
    cy.url().should("include", "_blue");
  });

  it("should navigate to the correct Red Picks & Bans Link", () => {
    cy.get(".link-rect2 a").click();
    cy.url().should("include", "_red");
  });

  it("should navigate to the correct Spectator Picks & Bans Link", () => {
    cy.get(".link-rect3 a").click();
    cy.url().should("not.include", "_blue");
    cy.url().should("not.include", "_red");
  });

  it("should navigate back to the ProdraftLink page after clicking the Spectator Picks & Bans Link", () => {
    cy.get(".link-rect3 a").click();
    cy.go("back");
    cy.url().should("include", "prodraft");
  });
});
