import { apiRequest, apiUrl, clearAuthSession, setAccessToken, setStoredUser } from './api-client';
import type {
  AuthResponse,
  Categoria,
  ConfiguracionEmpresa,
  Documento,
  Empresa,
  Farmacia,
  HistorialExportacion,
  ID,
  LoginRequestBody,
  LoginPayload,
  Medicamento,
  Pedido,
  Plan,
  Proveedor,
  Usuario,
  Venta,
} from '../types/api';

type CreateMedicamentoPayload = Omit<Medicamento, 'id' | 'proveedor' | 'categoria'>;
type UpdateMedicamentoPayload = Partial<CreateMedicamentoPayload>;
type CreateProveedorPayload = Omit<Proveedor, 'id'>;
type UpdateProveedorPayload = Partial<CreateProveedorPayload>;
type CreateCategoriaPayload = Omit<Categoria, 'id'>;
type UpdateCategoriaPayload = Partial<CreateCategoriaPayload>;
type CreateUsuarioPayload = Omit<Usuario, 'id'> & { password?: string; contraseña?: string };
type UpdateUsuarioPayload = Partial<CreateUsuarioPayload>;

export const authApi = {
  async login(payload: LoginPayload) {
    const body: LoginRequestBody = {
      email: payload.email,
      contraseña: payload.password,
    };
    const response = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body,
      skipAuth: true,
    });
    const token = response.accessToken ?? response.access_token ?? response.token;
    if (token) {
      setAccessToken(token);
    }
    const user = response.user ?? response.usuario;
    if (user) {
      setStoredUser(user);
    }
    return response;
  },
  refresh() {
    return apiRequest<AuthResponse>('/api/auth/refresh', { method: 'POST' });
  },
  async logout() {
    try {
      await apiRequest<void>('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[Logout error]', error);
      }
    } finally {
      clearAuthSession();
    }
  },
};

export const medicamentosApi = {
  list: () => apiRequest<Medicamento[]>('/api/medicamentos'),
  all: () => apiRequest<Medicamento[]>('/api/medicamentos/all'),
  count: () => apiRequest<number | { count: number }>('/api/medicamentos/count'),
  caducidad: () => apiRequest<Medicamento[]>('/api/medicamentos/caducidad'),
  stats: () => apiRequest<unknown>('/api/medicamentos/stats'),
  get: (id: ID) => apiRequest<Medicamento>(`/api/medicamentos/${id}`),
  create: (payload: CreateMedicamentoPayload) =>
    apiRequest<Medicamento>('/api/medicamentos/create', { method: 'POST', body: payload }),
  update: (id: ID, payload: UpdateMedicamentoPayload) =>
    apiRequest<Medicamento>(`/api/medicamentos/update/${id}`, { method: 'PUT', body: payload }),
  delete: (id: ID) => apiRequest<void>(`/api/medicamentos/delete/${id}`, { method: 'DELETE' }),
  countByName: (nombre: string) =>
    apiRequest<number | { count: number }>(`/api/medicamentos/count/nombre/${encodeURIComponent(nombre)}`),
};

export const proveedoresApi = {
  all: () => apiRequest<Proveedor[]>('/api/proveedores/all'),
  get: (id: ID) => apiRequest<Proveedor>(`/api/proveedores/${id}`),
  create: (payload: CreateProveedorPayload) =>
    apiRequest<Proveedor>('/api/proveedores/create', { method: 'POST', body: payload }),
  update: (id: ID, payload: UpdateProveedorPayload) =>
    apiRequest<Proveedor>(`/api/proveedores/update/${id}`, { method: 'PUT', body: payload }),
  delete: (id: ID) => apiRequest<void>(`/api/proveedores/delete/${id}`, { method: 'DELETE' }),
  medicamentos: (id: ID) => apiRequest<Medicamento[]>(`/api/proveedores/${id}/medicamentos`),
};

export const usersApi = {
  all: () => apiRequest<Usuario[]>('/api/users/all'),
  get: (id: ID) => apiRequest<Usuario>(`/api/users/${id}`),
  getNameRole: (id: ID) => apiRequest<Usuario>(`/api/users/id-name/${id}`),
  byEmail: (email: string) => apiRequest<Usuario>(`/api/users/email/${encodeURIComponent(email)}`),
  byRol: (rol: Usuario['rol']) => apiRequest<Usuario[]>(`/api/users/rol/${rol}`),
  create: (payload: CreateUsuarioPayload) => apiRequest<Usuario>('/api/users/create', { method: 'POST', body: payload }),
  update: (id: ID, payload: UpdateUsuarioPayload) =>
    apiRequest<Usuario>(`/api/users/update/${id}`, { method: 'PUT', body: payload }),
  delete: (id: ID) => apiRequest<void>(`/api/users/delete/${id}`, { method: 'DELETE' }),
  perfil: () => apiRequest<Usuario>('/api/users/perfil'),
};

export const categoriasApi = {
  all: () => apiRequest<Categoria[]>('/api/categorias/all'),
  get: (id: ID) => apiRequest<Categoria>(`/api/categorias/${id}`),
  create: (payload: CreateCategoriaPayload) =>
    apiRequest<Categoria>('/api/categorias/create', { method: 'POST', body: payload }),
  update: (id: ID, payload: UpdateCategoriaPayload) =>
    apiRequest<Categoria>(`/api/categorias/update/${id}`, { method: 'PUT', body: payload }),
  delete: (id: ID) => apiRequest<void>(`/api/categorias/delete/${id}`, { method: 'DELETE' }),
};

export const documentosApi = {
  subir: (formData: FormData) => apiRequest<Documento>('/api/documentos/subir', { method: 'POST', body: formData }),
  subirIa: (formData: FormData) =>
    apiRequest<Documento>('/api/documentos/subir-ia', { method: 'POST', body: formData }),
  listar: () => apiRequest<Documento[]>('/api/documentos/listar'),
  byTipo: (tipo: string) => apiRequest<Documento[]>(`/api/documentos/tipo/${encodeURIComponent(tipo)}`),
  get: (id: ID | string) => apiRequest<Documento>(`/api/documentos/${id}`),
  descargarUrl: (id: ID | string) => `${apiUrl}/api/documentos/descargar/${id}`,
};

export const ventasApi = {
  create: (payload: unknown) => apiRequest<Venta>('/api/venta', { method: 'POST', body: payload as Record<string, unknown> }),
};

export const empresasApi = {
  all: () => apiRequest<Empresa[]>('/api/empresas'),
  get: (id: ID) => apiRequest<Empresa>(`/api/empresas/${id}`),
  create: (payload: Partial<Empresa>) => apiRequest<Empresa>('/api/empresas', { method: 'POST', body: payload }),
  update: (id: ID, payload: Partial<Empresa>) => apiRequest<Empresa>(`/api/empresas/${id}`, { method: 'PATCH', body: payload }),
  delete: (id: ID) => apiRequest<void>(`/api/empresas/${id}`, { method: 'DELETE' }),
  trialStatus: (id: ID) => apiRequest<unknown>(`/api/empresas/${id}/trial-status`),
  activas: () => apiRequest<Empresa[]>('/api/empresas/estado/activas'),
  inactivas: () => apiRequest<Empresa[]>('/api/empresas/estado/inactivas'),
};

export const planesApi = {
  all: () => apiRequest<Plan[]>('/api/planes'),
  seed: () => apiRequest<Plan[]>('/api/planes/seed', { method: 'POST' }),
};

export const suscripcionesApi = {
  crearInicial: (empresaId: ID) =>
    apiRequest<unknown>(`/api/suscripciones/crear-inicial/${empresaId}`, { method: 'POST' }),
  renovar: (empresaId: ID) => apiRequest<unknown>(`/api/suscripciones/renovar/${empresaId}`, { method: 'POST' }),
  verificarVencidas: () => apiRequest<unknown>('/api/suscripciones/verificar-vencidas'),
};

export const configuracionApi = {
  crear: (payload: Partial<ConfiguracionEmpresa>) =>
    apiRequest<ConfiguracionEmpresa>('/api/configuracion/crear', { method: 'POST', body: payload }),
  byEmpresa: (empresaId: ID) => apiRequest<ConfiguracionEmpresa>(`/api/configuracion/empresa/${empresaId}`),
  update: (id: ID, payload: Partial<ConfiguracionEmpresa>) =>
    apiRequest<ConfiguracionEmpresa>(`/api/configuracion/${id}`, { method: 'PUT', body: payload }),
};

export const farmaciaApi = {
  create: (payload: Partial<Farmacia>) => apiRequest<Farmacia>('/api/farmacia', { method: 'POST', body: payload }),
  all: () => apiRequest<Farmacia[]>('/api/farmacia'),
  byEmpresa: (empresaId: ID) => apiRequest<Farmacia[]>(`/api/farmacia/empresa/${empresaId}`),
  get: (id: ID) => apiRequest<Farmacia>(`/api/farmacia/${id}`),
  update: (id: ID, payload: Partial<Farmacia>) => apiRequest<Farmacia>(`/api/farmacia/${id}`, { method: 'PATCH', body: payload }),
  delete: (id: ID) => apiRequest<void>(`/api/farmacia/${id}`, { method: 'DELETE' }),
};

export const pedidosApi = {
  all: () => apiRequest<Pedido[]>('/api/pedidos'),
  get: (id: ID) => apiRequest<Pedido>(`/api/pedidos/${id}`),
  create: (payload: unknown) => apiRequest<Pedido>('/api/pedidos', { method: 'POST', body: payload as Record<string, unknown> }),
  update: (id: ID, payload: Partial<Pedido>) => apiRequest<Pedido>(`/api/pedidos/${id}`, { method: 'PATCH', body: payload }),
};

export const historialExportacionApi = {
  all: () => apiRequest<HistorialExportacion[]>('/api/historial-exportacion'),
  porFecha: (query = '') => apiRequest<HistorialExportacion[]>(`/api/historial-exportacion/por-fecha${query}`),
  porNombre: (nombre: string) =>
    apiRequest<HistorialExportacion[]>(`/api/historial-exportacion/por-nombre/${encodeURIComponent(nombre)}`),
  porUsuario: (usuarioId: ID) => apiRequest<HistorialExportacion[]>(`/api/historial-exportacion/por-usuario/${usuarioId}`),
  porDocumento: (documentoId: ID | string) =>
    apiRequest<HistorialExportacion[]>(`/api/historial-exportacion/por-documento/${documentoId}`),
  get: (id: ID) => apiRequest<HistorialExportacion>(`/api/historial-exportacion/${id}`),
};

