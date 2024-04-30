import { renderHook, act } from "@testing-library/react";
import { createQueryWrapper } from "./testHelpers";
import { useGetConductores, useCreateConductor, useUpdateConductor, useDeleteConductor, useGetConductorById } from "../api";
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

describe('useGetConductores', () => {
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

  it('should fetch conductores', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetConductores(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate("");
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/conductores', {});
    
  });

  it('should create a new conductor', async () => {
    (httpClient.post as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useCreateConductor(), {
      wrapper: createQueryWrapper()
    });

    const conductor = {
		nombreConductor: "",
		fechaNacimiento: "2009-01-11",
		curp: "qwertyuiopasdfghjk",
        direccionCasa: "",
        salario: 1,
        numeroLicencia: 12345,
    }
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate(conductor);
    });

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('/conductores', conductor);
  });

  it('should update an existing conductor', async () => {
    (httpClient.put as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useUpdateConductor(), {
      wrapper: createQueryWrapper()
    });

    const conductorActualizado = {
		nombreConductor: "Stuart",
		fechaNacimiento: "2009-01-11",
		curp: "mnbvcxzlkjhgfdsapo",
        direccionCasa: "casa",
        salario: 1,
        numeroLicencia: 12345,
    }
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate({conductorId: 1, conductor: conductorActualizado});
    });

    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith(`/conductores/${1}`, conductorActualizado);
  });

  it('should delete an existing conductor', async () => {
    (httpClient.delete as jest.Mock).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useDeleteConductor(), {
      wrapper: createQueryWrapper()
    });
    
    const { mutate } = result.current;

    await act(async () => {
      await mutate(1);
    });

    expect(httpClient.delete).toHaveBeenCalledTimes(1);
    expect(httpClient.delete).toHaveBeenCalledWith(`/conductores/${1}`);
  });

  it('should fetch a conductor by ID', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetConductorById(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate(1);
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/conductores/1');
  });
  
});
