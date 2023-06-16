export async function streamUInt8ArrayToString(
  stream: ReadableStream<Uint8Array>,
  label?: string | undefined, 
  options?: TextDecoderOptions | undefined): Promise<string> {
    const reader = stream.getReader();
    let result = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = new TextDecoder(label,options).decode(value);
      result += chunk;
    }
    return result;
  }
  