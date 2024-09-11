describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login'); // Ajuste o caminho da URL de login
  });

  it('Deve exibir a imagem e o texto corretamente', () => {
    cy.get('.full-width-img').should('be.visible');
    cy.get('.overlay-text h3').should('contain', 'ForHub');
    cy.get('.overlay-text p').should('contain', 'Texto exemplo falando sobre a empresa e sua ideia.');
  });

  it('Deve preencher o formulário de login', () => {
    cy.get('#username').type('usuario_teste');
    cy.get('#password').type('senha_teste');
    cy.get('body').click();
    cy.get('button[type="submit"]').click();  
    


   
    cy.url().should('include', '/dashboard');
  });

  it('Deve exibir erro de login incorreto', () => {
    cy.get('#username').type('usuario_invalido');
    cy.get('#password').type('senha_invalida');
    cy.get('body').click();
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Erro ao Logar. Verifique os dados e tente novamente.');
    });
  });
});
