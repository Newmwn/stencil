import { Component, Prop, h } from '@stencil/core';

export interface ColumnConfig {
  property: string;
  label: string;
  type: 'label' | 'value';
  format?: 'number' | 'percentage' | 'currency';
  color?: string;
}

@Component({
  tag: 'data-table',
  styleUrl: 'chart-table.css',
  shadow: true,
})
export class DataTable {
  @Prop() data: any[] = [];
  @Prop() columns: ColumnConfig[] = [];
  @Prop() showTotal: boolean = false;

  private formatValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '-';

    switch (format) {
      case 'percentage':
        return `${parseFloat(value).toFixed(2)}%`;
      case 'number':
        return parseFloat(value).toFixed(2);
      case 'currency':
        return new Intl.NumberFormat('pt-PT', {
          style: 'currency',
          currency: 'EUR'
        }).format(parseFloat(value));
      default:
        return value.toString();
    }
  }

  private calculateTotal(property: string, format?: string): string {
    if (this.data.length === 0) return '-';

    const values = this.data.map(item => parseFloat(item[property]) || 0);
    const total = values.reduce((acc, val) => acc + val, 0);

    return this.formatValue(total, format);
  }

  render() {
    return (
      <div class="table-wrapper">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                {this.columns.map(col => (
                  <th key={col.property}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.data.map((row, index) => (
                <tr key={index} class="row">
                  {this.columns.map(col => (
                    <td key={col.property}>
                      {col.type === 'label'
                        ? <div>
                          <div
                            class="color-indicator"
                            style={{ backgroundColor: row.color || '#ccc' }}
                          ></div>
                          {row[col.property]}

                        </div>
                        : this.formatValue(row[col.property], col.format)
                      }
                    </td>
                  ))}
                </tr>
              ))}
              {this.showTotal && (
                <tr class="total-row">
                  {this.columns.map(col => (
                    <td key={col.property}>
                      <strong>
                        {col.type === 'label'
                          ? 'Total'
                          : this.calculateTotal(col.property, col.format)
                        }
                      </strong>
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

/*
=== EXEMPLO DE USO ===

// Dados de exemplo (já com valores calculados)
const dadosTabela = [
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
const configColunas: ColumnConfig[] = [
  { 
    property: 'nome', 
    label: 'Produto', 
    type: 'label'
  },
  { 
    property: 'vendas', 
    label: 'Vendas Totais', 
    type: 'value',
    format: 'currency'
  },
  { 
    property: 'lucro', 
    label: 'Lucro', 
    type: 'value',
    format: 'number'
  },
  { 
    property: 'percentagem', 
    label: 'Percentagem', 
    type: 'value',
    format: 'percentage'
  },
];

// Uso no componente
<data-table 
  data={dadosTabela} 
  columns={configColunas} 
  showTotal={true}
></data-table>
*/