
describe('Test authentication', function () {

    let access_token

    it('Test endpoint, try to GET catalog with auth KO', function () {
        cy.request({
            method: 'POST',
            url: 'https://sbx-api-sec.ziniopro.com/oauth/v2/tokens',
            form: true,
            headers: {
                "Autorization": "bearer " + access_token,

            },
            body: {
                "client_id": "C9EeT8cWZ7u7LcYYvOTlFyONeHCN3OZp",
                "client_secret": "ns1huoaQM3aCPq1yh6dcizirP99cMrsc",
                "grant_type": "client_credentials"
            }
        }).then(response => {
            expect(response).property('status').to.equal(200)
        })

        cy.request({
            method: 'GET',
//            failOnStatusCode: false,                                    // prevent fail
            url: 'https://sbx-api-sec.ziniopro.com/catalog/v2/catalogs?access_token=' + access_token,
            body: {
                "client_id": "C9EeT8cWZ7u7LcYYvOTlFyONeHCN3OZp",
                "client_secret": "ns1huoaQM3aCPq1yh6dcizirP99cMrsc",
                "grant_type": "client_credentials"
            },
            failOnStatusCode: false
        }).then(response => {
            cy.log(JSON.stringify(response));
            expect(response).property('status').to.equal(401)
        })   

    })

    it('Generate token', () => {
        //to get the token id(access token)
        cy.request({
            method: 'POST',
            url: 'https://sbx-api-sec.ziniopro.com/oauth/v2/tokens',
            form: true,
            body: {
                "client_id": "C9EeT8cWZ7u7LcYYvOTlFyONeHCN3OZp",
                "client_secret": "ns1huoaQM3aCPq1yh6dcizirP99cMrsc",
                "grant_type": "client_credentials"
            }
        }).then(response => {
            expect(response).property('status').to.equal(200)
            cy.log(JSON.stringify(response));
            cy.log('TOKEN: ' + response.body.access_token);
            access_token = response.body.access_token;
        })
    })

    it('Auth OK', function () {

    })

    it('Test endpoint, GET catalog with auth OK', function () {

        cy.request({
            method: 'POST',
            url: 'https://sbx-api-sec.ziniopro.com/oauth/v2/tokens',
            form: true,
            headers: {
                "Autorization": "bearer " + access_token,

            },
            body: {
                "client_id": "C9EeT8cWZ7u7LcYYvOTlFyONeHCN3OZp",
                "client_secret": "ns1huoaQM3aCPq1yh6dcizirP99cMrsc",
                "grant_type": "client_credentials"
            }
        }).then(response => {
            cy.log(JSON.stringify(response));
        })

        cy.request({
            method: 'GET',
            url: 'https://sbx-api-sec.ziniopro.com/catalog/v2/catalogs?access_token=' + access_token,
            body: {
                "client_id": "C9EeT8cWZ7u7LcYYvOTlFyONeHCN3OZp",
                "client_secret": "ns1huoaQM3aCPq1yh6dcizirP99cMrsc",
                "grant_type": "client_credentials"
            }

        }).then(response => {
            expect(response).property('status').to.equal(200)
            cy.log(JSON.stringify(response));
        })
    })
})
