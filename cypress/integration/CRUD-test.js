describe("Add, edit, display and delete new item test", () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/sights-list');
  });

  it('should go back to main page', () => {
    cy.get("a").contains("ADD").click();
    cy.url().should('include', '/form');
    cy.get('#form-close').click();
    cy.wait(400);
    cy.url().should('eq', 'http://localhost:4200/sights');
  })

  it('should add new item', () => {
    cy.get("a").contains("ADD").click();
    cy.wait(400);
    cy.url().should('include', '/form')
    cy.get('#form-name').type('Adam Mickiewicz');
    cy.get('#form-longitude').type('19.937908');
    cy.get('#form-latitude').type('50.061500');
    cy.get('#form-country').select('POLAND');
    cy.get('#form-description').type('Pomnik Wieszcza Adama Mickiewicza');
    cy.get('#form-color').type('1');
    cy.get('#form-submit').click();
    cy.wait(400);
    cy.visit('http://localhost:4200/sights-list');
    cy.get(":last-child > h4").contains('Adam Mickiewicz');
  });

  if('should display added item details', () => {
    cy.get(":last-child > .details").click();
    cy.wait(400);
    cy.get("#detail-name").contains('Adam Mickiewicz');
  })

    it('should edit last item', () => {
      cy.get(":last-child > .edit").click();
      cy.wait(600);
      cy.get('#form-name').type(' edytowany');
      cy.get('#form-country').select('POLAND');
      cy.get('#form-submit').click();
      cy.wait(400);
      cy.visit('http://localhost:4200/sights-list');
      cy.get(":last-child > h4").contains('Adam Mickiewicz edytowany');
    })

  it('should delete last item', () => {
    cy.get(":last-child > .delete").click();
    cy.wait(400);
    cy.get(":last-child > h4").not('Warszawa testowa edytowana');
  })
});
