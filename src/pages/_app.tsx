import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import "@/shared/styles/globals.css"
import "flowbite"
import dynamic from "next/dynamic"
const Toaster = dynamic(
  import("react-hot-toast").then((module) => module.Toaster),
  {
    ssr: false,
  },
)
const ConfirmModal = dynamic(
  import("../widgets/Modals/Dashboard/ConfirmModal").then((module) => module.ConfirmModal),
  {
    ssr: false,
  },
)
const DocumentModal = dynamic(
  import("../widgets/Modals/DocumentModal").then((module) => module.DocumentModal),
  {
    ssr: false,
  },
)

import "react-photo-view/dist/react-photo-view.css"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <>
      <Component {...pageProps} />
      <ConfirmModal />
      <DocumentModal />
      <Toaster position="bottom-right" />
    </>,
  )
}
