export interface ItemFactura {
  descripcion: string;
  cantidad: number;
  precio: number;
}

export interface DatosFactura {
  empresa: string;
  fecha: string;
  numeroFactura: string;
  cliente: {
    nombre: string;
    direccion: string;
    nit: string;
  };
  items: ItemFactura[];
  iva?: number;
}