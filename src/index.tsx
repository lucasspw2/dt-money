import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import { ServerResponse } from 'http';

createServer({

  models: ({
    transaction: Model
  }),

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposito',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-11-13 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'retirada',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-11-13 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


