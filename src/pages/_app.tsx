import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import "@/shared/styles/globals.css"
import { ConfirmModal } from "../widgets/Modals/Dashboard/ConfirmModal"
import "flowbite"
import dynamic from "next/dynamic"
const Toaster = dynamic(
  import("react-hot-toast").then((module) => module.Toaster),
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
  console.log('1');
  return getLayout(
    <>
      <Component {...pageProps} />
      <ConfirmModal />
      <Toaster position="bottom-right" />
    </>,
  )
}
