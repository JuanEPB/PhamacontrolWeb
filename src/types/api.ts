export type ID = number;

export type Categoria = {
  id: ID;
  nombre: string;
};

export type Proveedor = {
  id: ID;
  nombre: string;
  contacto: string;
  direccion: string;
};

export type Medicamento = {
  id: ID;
  nombre: string;
  lote: string;
  caducidad: string;
  stock: number;
  precio: number;
  proveedorId: ID | null;
  categoriaId: ID | null;
  proveedor?: Proveedor;
  categoria?: Categoria;
};

export type MedicamentosStats = {
  total: number;
  porCaducar: number;
  caducados: number;
  bajoStock: number;
  porCategoria: Record<string, number>;
};

export type MedicamentosCaducidad = {
  total: number;
  medicamentos: Medicamento[];
};

export type UsuarioRol = 'admin' | 'usuario' | 'chatbot';

export type Usuario = {
  id: ID;
  nombre?: string;
  apellido?: string;
  rol: UsuarioRol;
  email?: string;
  farmacia_id?: ID | null;
  farmaciaId?: ID | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginRequestBody = {
  email: string;
  contraseña: string;
};

export type AuthResponse = {
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
  token?: string;
  user?: Usuario;
  usuario?: Usuario;
};

export type Empresa = {
  id: ID;
  nombre: string;
  rfc: string;
  direccion: string | null;
  email_contacto: string | null;
  telefono_contacto: string | null;
  estado: string;
  fecha_registro: string;
  fecha_expiracion: string | null;
  plan_id: ID | null;
};

export type Farmacia = {
  id: ID;
  nombre: string;
  rfc: string;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  lema: string | null;
  logo_url: string | null;
  activo: boolean | number;
  fecha_registro: string;
  empresa_id: ID | null;
};

export type PedidoEstatus = 'ENVIADO' | 'RECIBIDO' | 'CANCELADO';

export type Pedido = {
  id: ID;
  fecha_pedido: string;
  fecha_recibido: string | null;
  estatus: PedidoEstatus;
  total: string | number;
  proveedor_id: ID | null;
  farmacia_id: ID | null;
};

export type PedidoItem = {
  id: ID;
  cantidad: number;
  precio_unitario: string | number;
  subtotal: string | number;
  lote: string | null;
  fecha_caducidad: string | null;
  pedido_id: ID | null;
  medicamento_id: ID | null;
};

export type Venta = {
  id: ID;
  total: string | number;
  usuarioId: ID | null;
  fecha: string;
  farmacia_id: ID | null;
};

export type VentaDetalle = {
  id: ID;
  cantidad: number;
  precioUnitario: string | number;
  ventaId: ID | null;
  medicamentoId: ID | null;
};

export type Plan = {
  id: ID;
  nombre: string;
  precio_mensual: string | number;
  limiteFarmacias: number;
  limiteUsuarios: number;
  limiteReportes: number;
  limiteRegistros: number;
  periodo_prueba_dias: number | null;
  movil: boolean | number;
  IA: boolean | number;
  nivel_soporte: string;
  descripcion: string | null;
};

export type ConfiguracionEmpresa = {
  id: ID;
  logo_url: string | null;
  lema: string | null;
  color_primario: string | null;
  color_secundario: string | null;
  mostrar_marca: boolean | number;
  fecha_creacion: string;
  fecha_actualizacion: string;
  empresa_id: ID | null;
};

export type Documento = {
  id: ID | string;
  nombre?: string;
  tipo?: string;
  url?: string;
  fecha?: string;
};

export type HistorialExportacion = {
  id: ID;
  fecha: string;
  documento: string;
  usuarioId: ID | null;
};
