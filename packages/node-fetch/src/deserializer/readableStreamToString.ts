export async function readableStreamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: Uint8Array) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'));
    });

    stream.on('error', (error: Error) => {
      reject(error);
    });
  });
}
  