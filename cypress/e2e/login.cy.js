import { errorMessages } from "../../src/components/Login";

beforeEach(() => {
  cy.visit('/');
});

describe('Login Page', () => {
  describe('Error Messages', () => {
    it('Name input throws for 2 chars', () => {
      cy.get('[data-cy="ad-input"]').type("em");
      cy.contains(errorMessages.ad);
    });

    it('Surname input throws for 2 chars', () => {
      cy.get('[data-cy="soyad-input"]').type("sa");
      cy.contains(errorMessages.soyad);
    });


    
    it('Email input throws for invalid format', () => {
      cy.get('[data-cy="email-input"]').type("emre@wit");
      cy.contains(errorMessages.email);
    });

    it('Password input throws for weak password', () => {
      cy.get('[data-cy="password-input"]').type("1234");
      cy.contains(errorMessages.password);
    });

    it('Button is disabled for invalid inputs', () => {
      cy.get('[data-cy="email-input"]').type("emre@wit");
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });
  });

  describe('Form inputs validated', () => {
    it('Button enables for valid inputs', () => {
      cy.get('[data-cy="ad-input"]').type("Rabia");
      cy.get('[data-cy="soyad-input"]').type("Karaca");
      cy.get('[data-cy="email-input"]').type("rabia@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("Asdf*1234");
      cy.get('[data-cy="submit-button"]').should("not.be.disabled");
    });

    it('Submits successfully for valid inputs', () => {
      cy.get('[data-cy="ad-input"]').type("Rabia");
      cy.get('[data-cy="soyad-input"]').type("Karaca");
      cy.get('[data-cy="email-input"]').type("rabia@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("Asdf*1234");
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="response-message"]').should("be.visible");
    });
  });
});
