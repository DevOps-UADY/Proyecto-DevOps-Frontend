import { renderHook, act } from "@testing-library/react";
import { createQueryWrapper } from "./testHelpers";

import { httpClient } from "../api/http";
import { useGetUsuarios } from '../api/usuarios';

let originalConsoleError: typeof console.error;

jest.mock('../api/http', () => ({
  httpClient: {
    get: jest.fn(),
   
  },
}));

describe('useGetUsuarios', () => {
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

  it('should fetch usuarios', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useGetUsuarios(), {
      wrapper: createQueryWrapper()
    });
      
    const { mutate } = result.current;
    act(() => {
      mutate("");
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/usuarios', {});
    
  });

 
  
});


// https://github.com/TanStack/query/discussions/1650
// https://github.com/TanStack/query/discussions/2300