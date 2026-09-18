// src/app/core/services/report.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);
  
  // Endpoint unificado de tu servidor local jsreport
  private JSREPORT_API = 'http://localhost:5488/api/report';

  /**
   * Método genérico y reutilizable para procesar CUALQUIER reporte del sistema
   */
  private renderizarPdf(htmlTemplate: string, datosJson: any): Observable<Blob> {
    const cuerpoPeticion = {
      template: {
        content: htmlTemplate,
        engine: 'handlebars',
        recipe: 'chrome-pdf'
      },
      data: datosJson
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.JSREPORT_API, cuerpoPeticion, { 
      headers: headers, 
      responseType: 'blob' 
    });
  }

  /**
   * Orquestador específico para el Reporte de Facturas
   */
  obtenerReporteFactura(datosFactura: any, plantillaHtml: string): Observable<Blob> {
    // Aquí en el futuro harás el switchMap para consumir primero tu Spring Boot
    return this.renderizarPdf(plantillaHtml, datosFactura);
  }
}
