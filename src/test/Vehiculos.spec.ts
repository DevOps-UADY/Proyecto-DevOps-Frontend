import { renderHook, act } from "@testing-library/react";
import { createQueryWrapper } from "./testHelpers";
import { useGetVehiculos, useCreateVehiculo, useUpdateVehiculo, useDeleteVehiculo, useGetVehiculoById } from "../api";
import { httpClient } from "../api/http";

let originalConsoleError: typeof console.error;

jest.mock('../api/http', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn() 
  },
}));

describe('useGetVehiculos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();
  });
  
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should fetch vehiculos', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetVehiculos(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate("");
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/vehiculos', {});
  });

  it('should create a new vehiculo', async () => {
    (httpClient.post as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useCreateVehiculo(), {
      wrapper: createQueryWrapper()
    });

    const vehiculo = {
      marca: "Marca",
      modelo: "Modelo",
      vin: "VIN123",
      placa: "ABC123",
      fechaCompra: "2024-05-11",
      costo: 10000,
      fotografia: "photo.jpg",
      estatusAsignacion: true,
    };
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate(vehiculo);
    });

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('/vehiculos', vehiculo);
  });

  it('should update an existing vehiculo', async () => {
    (httpClient.put as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useUpdateVehiculo(), {
      wrapper: createQueryWrapper()
    });

    const vehiculoActualizado = {
      marca: "Marca Actualizada",
      modelo: "Modelo Actualizado",
      vin: "VIN123",
      placa: "ABC123",
      fechaCompra: "2024-05-11",
      costo: 12000,
      fotografia: "photo_updated.jpg",
      estatusAsignacion: false,
    };
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate({vehiculoId: 1, vehiculo: vehiculoActualizado});
    });

    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith(`/vehiculos/${1}`, vehiculoActualizado);
  });

  it('should delete an existing vehiculo', async () => {
    (httpClient.delete as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useDeleteVehiculo(), {
      wrapper: createQueryWrapper()
    });
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate(1);
    });

    expect(httpClient.delete).toHaveBeenCalledTimes(1);
    expect(httpClient.delete).toHaveBeenCalledWith(`/vehiculos/${1}`);
  });

  it('should fetch a vehiculo by ID', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: {} });
    const { result } = renderHook(() => useGetVehiculoById(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate(1);
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/vehiculos/1');
  });
  
});
