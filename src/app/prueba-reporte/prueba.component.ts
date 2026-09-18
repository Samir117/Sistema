// src/app/features/reportes/viewer/viewer.component.ts
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReportService } from '../core/services/report.service';
import { getFacturaTemplate } from '../reportes/facturas/factura.template';
@Component({
  selector: 'app-prueba-reporte',
  standalone: true,
  templateUrl: '../reportes/vistaprevia/viewer.component.html',
  styleUrl: '../reportes/vistaprevia/viewer.component.css'
})
export class PruebaReporteComponent {
  // Inyecciones limpias
  private reportService = inject(ReportService);
  private sanitizer = inject(DomSanitizer);

  // Estados reactivos modernos con Signals
  cargando = signal<boolean>(false);
  pdfUrl = signal<SafeResourceUrl | null>(null);

  ejecutarPruebaLocal(): void {
    this.cargando.set(true);
    this.pdfUrl.set(null);

    // Mock de datos (Mañana vendrá desde una petición previa)
    const datosSimuladosJson = {
      paciente: 'Samir Costa',
      fecha: '17-09-2026',
      empresa: 'Clínica Sanitas',
    };

    // Obtenemos el layout del reporte
    const htmlTemplate = getFacturaTemplate();

    // Invocación limpia al servicio centralizado
    this.reportService.obtenerReporteFactura(datosSimuladosJson, htmlTemplate).subscribe({
      next: (pdfBlob: Blob) => {
        const blobUrl = URL.createObjectURL(pdfBlob);
        this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error en componente:', err);
        this.cargando.set(false);
      },
    });
  }
}
