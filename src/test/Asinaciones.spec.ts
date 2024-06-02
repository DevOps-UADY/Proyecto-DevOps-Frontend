import { renderHook, act } from "@testing-library/react";
import { createQueryWrapper } from "./testHelpers";
import { useGetAsignaciones, useCreateAsignacion, useDeleteAsignacion } from "../api";
import { httpClient } from "../api/http";

let originalConsoleError: typeof console.error;

jest.mock('../api/http', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn() 
  },
}));

describe('useGetAsignaciones', () => {
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

  it('should fetch asignaciones', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetAsignaciones(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate("");
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/asignaciones', {});
    
  });

  it('should create a new asignacion', async () => {
    (httpClient.post as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useCreateAsignacion(), {
      wrapper: createQueryWrapper()
    });

    const asignacion = {
      idVehiculo: 1,
      idConductor: 1,
    }
    act(() => {
      result.current.mutate(asignacion);
    });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('/asignaciones', asignacion);
  });

  it('should delete asignacion', async () => {
    (httpClient.delete as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useDeleteAsignacion(), {
      wrapper: createQueryWrapper()
    });

    const id = 1;
    act(() => {
      result.current.mutate(id);
    });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.delete).toHaveBeenCalledTimes(1);
    expect(httpClient.delete).toHaveBeenCalledWith(`/asignaciones/${id}`);
  });
});