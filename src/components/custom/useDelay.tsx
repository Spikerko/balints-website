// useDelay.tsx
import { useRef } from 'react';

// Cache to store delay resources for different durations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const delayCache = new Map<number, any>();

function createDelay(ms: number) {
  let status = 'pending';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;
  
  const promise = new Promise(resolve => {
    setTimeout(() => {
      status = 'success';
      result = true;
      resolve(true);
    }, ms);
  });
  
  return {
    read() {
      if (status === 'pending') {
        throw promise;
      }
      return result;
    }
  };
}

function useDelay(msDuration: number) {
  const firstRender = useRef(true);
  
  // Skip the delay on component re-renders unless explicitly re-enabled
  if (!firstRender.current) {
    return true;
  }
  
  firstRender.current = false;
  
  // Get or create the delay resource for this duration
  let delayResource = delayCache.get(msDuration);
  
  if (!delayResource) {
    delayResource = createDelay(msDuration);
    delayCache.set(msDuration, delayResource);
  }
  
  // This will either return the result or throw a promise
  return delayResource.read();
}

export default useDelay;