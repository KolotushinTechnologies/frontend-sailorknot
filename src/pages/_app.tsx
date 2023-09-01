import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import "@/shared/styles/globals.css"
import { ConfirmModal } from "../widgets/Modals/Dashboard/ConfirmModal"
import 'flowbite';
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
    </>,
  )
}
