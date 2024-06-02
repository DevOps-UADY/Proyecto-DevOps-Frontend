import { renderHook, act } from "@testing-library/react";
import { createQueryWrapper } from "./testHelpers";
import { useGetRecorridos, useCreateRecorrido, useUpdateRecorrido } from "../api";
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

describe('useGetRecorridos', () => {
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

  it('should fetch recorridos', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetRecorridos(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate("");
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/recorridos', {});
    
  });

  it('should create a new recorrido', async () => {
    (httpClient.post as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useCreateRecorrido(), {
      wrapper: createQueryWrapper()
    });

    const recorrido = {
        asignacionId: 1,
        rutaId: 1,
        fechaRecorrido: "",
        exito: true,
        comentario: "string"
    }
    act(() => {
      result.current.mutate(recorrido);
    });
  });

  it('should update a recorrido', async () => {
    (httpClient.put as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useUpdateRecorrido(), {
      wrapper: createQueryWrapper()
    });

    const recorrido = {
        asignacionId: 1,
        rutaId: 1,
        fechaRecorrido: "",
        exito: true,
        comentario: "string"
    }
    act(() => {
      result.current.mutate({recorridoId: 1, recorrido});
    });
    }
    );
});