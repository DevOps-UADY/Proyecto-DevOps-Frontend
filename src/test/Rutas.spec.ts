import { renderHook, act } from "@testing-library/react";
import { createQueryWrapper } from "./testHelpers";
import { useGetRutas, useCreateCRuta, useUpdateRuta, useDeleteRuta, useGetRutaById } from "../api";
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

describe('useGetRutas', () => {
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

  it('should fetch rutas', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetRutas(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate("");
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/rutas', {});
    
  });

  it('should create a new ruta', async () => {
    (httpClient.post as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useCreateCRuta(), {
      wrapper: createQueryWrapper()
    });

    const ruta = {
      nombreRuta: "",
			estadoRuta: true,
			latitudDestino: 90,
			longitudDestino: 180,
    }
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate(ruta);
    });

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('/rutas', ruta);
  });

  it('should update an existing ruta', async () => {
    (httpClient.put as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useUpdateRuta(), {
      wrapper: createQueryWrapper()
    });

    const rutaActualizada = {
      nombreRuta: "Ruta Actualizada",
      estadoRuta: true,
      latitudDestino: 90,
      longitudDestino: 180,
    };
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate({rutaId: 1, ruta: rutaActualizada});
    });

    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith(`/rutas/${1}`, rutaActualizada);
  });

  it('should delete an existing ruta', async () => {
    (httpClient.delete as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useDeleteRuta(), {
      wrapper: createQueryWrapper()
    });
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate(1);
    });

    expect(httpClient.delete).toHaveBeenCalledTimes(1);
    expect(httpClient.delete).toHaveBeenCalledWith(`/rutas/${1}`);
  });

  it('should fetch a ruta by ID', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetRutaById(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate(1);
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/rutas/1');
  });
  
});


// https://github.com/TanStack/query/discussions/1650
// https://github.com/TanStack/query/discussions/2300