import { renderToPipeableStream } from 'react-dom/server'
import type { EntryContext } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { PassThrough } from 'stream'

const ABORT_DELAY = 5000

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { abort, pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onAllReady() {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          pipe(body)
        },
        onError(error: unknown) {
          didError = true

          console.error(error)
        },
        onShellError(error: unknown) {
          reject(error)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { abort, pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onError(error: unknown) {
          didError = true

          console.error(error)
        },
        onShellError(err: unknown) {
          reject(err)
        },
        onShellReady() {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          pipe(body)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
}
