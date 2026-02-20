/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function lettersToNumbers(letters: string): (number | null) {
  if (typeof letters !== 'string' || !/^[a-jA-J]+$/.test(letters)) {
    return null;
  }

  const lowerCaseLetters = letters.toLowerCase();
  let numberString = '';

  const mapping = {
    a: '1', b: '2', c: '3', d: '4', e: '5',
    f: '6', g: '7', h: '8', i: '9', j: '0',
  };

  for (let i = 0; i < lowerCaseLetters.length; i++) {
    const char = lowerCaseLetters[i];
    numberString += mapping[char as keyof typeof mapping];
  }

  return Number(numberString);
}

export function numbersToLetters(number: number): (string | null) {
  if (typeof number !== 'number' || number < 0 || !Number.isInteger(number)) {
    return null;
  }

  const numberStr = String(number);
  let letterString = '';

  const mapping = {
    '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e',
    '6': 'f', '7': 'g', '8': 'h', '9': 'i', '0': 'j',
  };

  for (let i = 0; i < numberStr.length; i++) {
    const digit = numberStr[i];
    letterString += mapping[digit as keyof typeof mapping];
  }

  return letterString;
}

let formatsCount = 0;

export function wsFormat({ type, format, content, isError = false }: { type: string, format: ("string" | "json" | "number"), content: any, isError: boolean }): string {
  if (!type || !format || !content) throw new Error ("[wsFormat] Missing type | format | content");

  const formatMap = {
    string: "str",
    json: "j",
    number: "n",
  }

  const finalResult = {
      t: (type ?? "unknown"),
      f: (formatMap[format as keyof typeof formatMap] ?? "unknown"),
      ts: (new Date().getTime()),
      r: (format === "json" ? JSON.stringify(content) : content), 
      ft: formatsCount <= 0,
      e: isError,
  }

  formatsCount++

  return `f${JSON.stringify(finalResult)}`;
}


// Helper to convert ArrayBuffer to Hex String
function arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Helper to convert Hex String to ArrayBuffer
function hexToArrayBuffer(hex: string): ArrayBuffer {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes.buffer;
}

export async function encrypt(text: string, key: string): Promise<string | null> {
    if (typeof window === 'undefined' || typeof text !== 'string' || typeof key !== 'string') {
        return null;
    }

    try {
        const keyData = new TextEncoder().encode(key);
        const derivedKey = await window.crypto.subtle.digest('SHA-256', keyData);

        const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            derivedKey,
            { name: 'AES-CBC' },
            true,
            ['encrypt']
        );

        const iv = window.crypto.getRandomValues(new Uint8Array(16));
        const encodedText = new TextEncoder().encode(text);

        const encryptedContent = await window.crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            cryptoKey,
            encodedText
        );

        const ivHex = arrayBufferToHex(iv.buffer);
        const encryptedHex = arrayBufferToHex(encryptedContent);

        return `${ivHex}:${encryptedHex}`;
    } catch (error) {
        console.error('Encryption failed:', error);
        return null;
    }
}

export async function decrypt(encryptedText: string, key: string): Promise<string | null> {
    if (typeof window === 'undefined' || typeof encryptedText !== 'string' || typeof key !== 'string') {
        return null;
    }

    try {
        const textParts = encryptedText.split(':');
        if (textParts.length < 2) {
            console.error('Invalid encrypted text format.');
            return null;
        }

        const ivHex = textParts.shift()!;
        const encryptedHex = textParts.join(':');

        const iv = hexToArrayBuffer(ivHex);
        const encryptedData = hexToArrayBuffer(encryptedHex);
        
        const keyData = new TextEncoder().encode(key);
        const derivedKey = await window.crypto.subtle.digest('SHA-256', keyData);
        
        const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            derivedKey,
            { name: 'AES-CBC' },
            true,
            ['decrypt']
        );

        const decryptedContent = await window.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            cryptoKey,
            encryptedData
        );

        return new TextDecoder().decode(decryptedContent);
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
}

/**
 * Converts a hex color string (e.g. "#ff00aa" or "#f0a") to an RGB array [r, g, b] or CSS string "r, g, b".
 * Returns null if the input is invalid.
 * @param hex string hex color
 * @param cssFormat boolean return as CSS string
 */
export function hexToRgb(
  hex: string,
  cssFormat: boolean = false
): string | [number, number, number] | null {
  if (typeof hex !== "string") return null;
  let cleanHex = hex.trim().replace(/^#/, "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    return null;
  }
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return cssFormat ? `${r}, ${g}, ${b}` : [r, g, b];
}