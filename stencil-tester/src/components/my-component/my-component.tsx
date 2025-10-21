import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  dadosTabela = [
    {
      nome: 'Produto A',
      vendas: 1500.50,
      lucro: 450.25,
      percentagem: 33.33,
      color: '#4CAF50' // Verde
    },
    {
      nome: 'Produto B',
      vendas: 2300.75,
      lucro: 690.15,
      percentagem: 40.00,
      color: '#2196F3' // Azul
    },
    {
      nome: 'Produto C',
      vendas: 1800.00,
      lucro: 540.00,
      percentagem: 26.67,
      color: '#FF9800' // Laranja
    },
  ];

  // Configuração das colunas
  configColunas: any[] = [
    {
      property: 'nome',
      label: 'Produto',
      type: 'label'
    },
    {
      property: 'vendas',
      label: 'Vendas Totais',
      format: 'currency'
    },
    {
      property: 'lucro',
      label: 'Lucro',
      format: 'number'
    },
    {
      property: 'percentagem',
      label: 'Percentagem',
      format: 'percentage'
    },
  ];

  render() {
    return <data-table
      data={this.dadosTabela}
      columns={this.configColunas}
      showTotal={true}
    ></data-table>
  }
}
