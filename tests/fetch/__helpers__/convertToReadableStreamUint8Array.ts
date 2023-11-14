import type { adapter } from '@openapi-adapter/core';

export function convertToReadableStreamUint8Array(value: adapter.component.Any ) : ReadableStream<Uint8Array> 
{
    const encoder = new TextEncoder();
    const raw = encoder.encode(JSON.stringify(value))

    return new ReadableStream({
        type: "bytes",
        start(controller: ReadableByteStreamController) {
            controller.enqueue(raw)
            controller.close()
        }
    })
}