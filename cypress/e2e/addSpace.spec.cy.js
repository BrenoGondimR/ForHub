describe('Teste de Cadastro de Espaço', () => {
    it('Deve clicar no menu Espaços, clicar em "Adicionar Espaço", preencher o formulário e avançar', () => {

      cy.visit('http://localhost:8080/dashboard')
  
      cy.contains('Espaços').click()
  
      cy.contains('Adicionar Espaço').click()
  
      cy.get('input#roomName').type('Sala de Reunião Exemplo')
      cy.get('input#companyName').type('Empresa Exemplo')
      cy.get('textarea#description').type('Descrição da sala exemplo para reunião e eventos.')
      cy.get('input#phone').type('(11) 98765-4321')
      cy.get('input#cep').type('12345000')
      cy.get('input#logradouro').type('Avenida Exemplo')
      cy.get('input#bairro').type('Bairro Exemplo')
      cy.get('input#numero').type('123')
      cy.get('input#complemento').type('Sala 200')
  
      cy.get('input#wifi').check()
      cy.get('input#quadro').check()
      cy.get('input#cafe').check()
  
      cy.contains('Next').click()
  
      cy.get('input#domicilio_fiscal').type('120.00')
      cy.get('input#secretariado').type('179.90')
      cy.get('input#coworking').type('560.00')
      cy.get('input#sala_exclusiva').type('3500.00')
  
      cy.contains('Next').click()
  
      cy.get('input#pix').check()
      cy.get('input#boleto').check()
  

      cy.contains('Cadastrar').click()
    })
  })
  