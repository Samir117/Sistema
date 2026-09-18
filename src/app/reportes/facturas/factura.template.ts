import { GLOBAL_CSS } from './global.css'; 

export function getFacturaTemplate(): string {
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          /* Inyectamos tus estilos globales corporativos */
          ${GLOBAL_CSS}
          
          /* Estilos locales específicos de la factura */
          .header-table { width: 100%; margin-bottom: 20px; }
          .empresa { font-size: 18px; font-weight: bold; }
          .meta { text-align: right; font-size: 10px; color: #555; }
          .linea { border-bottom: 1px solid #000; margin-bottom: 15px; }
          .datos-cliente { margin-bottom: 20px; font-size: 11px; }
          .total-box { margin-top: 20px; float: right; width: 200px; }
          .total-box table { width: 100%; border-collapse: collapse; }
          .text-right { text-align: right; }
          .text-center { text-align: center; }
        </style>
      </head>
      <body>

        <!-- Cabecera -->
        <table class="header-table">
          <tr>
            <td class="empresa">{{empresa}}</td>
            <td class="meta">
              <strong>Factura N° {{numeroFactura}}</strong><br>
              Fecha: {{fecha}}
            </td>
          </tr>
        </table>
        
        <div class="linea"></div>

        <!-- Datos del Cliente -->
        <div class="datos-cliente">
          <strong>Cliente:</strong> {{cliente.nombre}}<br>
          <strong>NIT:</strong> {{cliente.nit}}<br>
          <strong>Dirección:</strong> {{cliente.direccion}}
        </div>

        <!-- Tabla de Items Dinámica usando Handlebars -->
        <table class="table-report">
          <thead>
            <tr>
              <th>Descripción</th>
              <th class="text-center">Cant.</th>
              <th class="text-right">Precio</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {{#each items}}
            <tr>
              <td>{{this.descripcion}}</td>
              <td class="text-center">{{this.cantidad}}</td>
              <td class="text-right">\${{this.precio}}</td>
              <!-- jsreport puede calcular el subtotal al vuelo si lo mandas listo en el JSON -->
              <td class="text-right">\${{this.subtotalItem}}</td> 
            </tr>
            {{/each}}
          </tbody>
        </table>

        <!-- Bloque de Totales -->
        <div class="total-box">
          <table>
            <tr>
              <td>Subtotal:</td>
              <td class="text-right">\${{subtotal}}</td>
            </tr>
            {{#if iva}}
            <tr>
              <td>IVA ({{ivaPorcentaje}}%):</td>
              <td class="text-right">\${{ivaCalculado}}</td>
            </tr>
            {{/if}}
            <tr style="font-weight: bold; color: #003366; font-size: 14px;">
              <td>TOTAL:</td>
              <td class="text-right">\${{total}}</td>
            </tr>
          </table>
        </div>

      </body>
    </html>
  `;
}
