describe('The root page to test server - localhost', () => {
    beforeEach(() => {
      // start the server and check server running at index.js
      cy.exec('npm run ', { timeout: 30000 } );
      cy.request('GET', 'http://localhost:8080'); // no problem with local server if past beforeeach
    })
  
    it('after server started, successfully loads endpoints', () => {
      cy.visit('https://willowapi.onrender.com');
      cy.url().should('include', '/');
      cy.request('GET', 'https://willowapi.onrender.com/apartments').then((resp) => {
        // if we got what we wanted
        if (resp.status === 200 && resp.body.ok === true)
          return
      });
      cy.request('GET', 'https://willowapi.onrender.com/houses').then((resp) => {
        // if we got what we wanted
        if (resp.status === 200 && resp.body.ok === true)
          return
      });
      cy.request('GET', 'https://willowapi.onrender.com/commercial').then((resp) => {
        // if we got what we wanted
        if (resp.status === 200 && resp.body.ok === true)
          return
      });
      cy.request('GET', 'https://willowapi.onrender.com/land').then((resp) => {
        // if we got what we wanted
        if (resp.status === 200 && resp.body.ok === true)
          return
      });
      cy.request('GET', 'https://willowapi.onrender.com/api-docs').then((resp) => {
        // if we got what we wanted
        if (resp.status === 200 && resp.body.ok === true)
          return
      });
      cy.request('GET', 'https://willowapi.onrender.com/home').then((resp) => {
        // if we got what we wanted
        if (resp.status === 200 && resp.body.ok === true)
          return
      });

    })
  })