import { ModalStore, documentModalIsActiveToggle } from "@/src/shared/store/modalStore"
import { SelectFileProps } from "@/src/shared/types"
import { Dialog, Transition } from "@headlessui/react"
import dynamic from "next/dynamic"
import { Fragment, useEffect, useState } from "react"
// const DocViewer = dynamic(import("@cyntler/react-doc-viewer"))
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { DocumentViewer } from "react-documents"

function DocumentModal() {
  const { documentModalIsActive, selectedFile } = ModalStore.useState((store) => store)

  function closeModal() {
    documentModalIsActiveToggle(false)
  }

  const [file, fileSet] = useState<SelectFileProps | null>(null)

  /**
   * https://github.com/Marcelh1983/document-viewer/tree/main/packages/react-documents
   * https://react-documents.web.app/
   * https://www.npmjs.com/package/react-doc-viewer/v/0.0.19
   */
  useEffect(() => {
    fileSet(selectedFile)
  }, [selectedFile])

  return (
    <>
      <Transition
        appear
        show={documentModalIsActive}
        as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[300]"
          onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="no-scrollbar h-full  w-full transform overflow-hidden overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button onClick={closeModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="h-10 w-10 text-gray-500">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900">
                      {file?.name}
                    </Dialog.Title>
                    {!file ? null : (
                      <DocViewer
                        documents={[
                          {
                            uri: file.isNew ? window.URL.createObjectURL(file.file) : `${file.url}`,
                            fileName: file.file.name,
                          },
                        ]}
                        pluginRenderers={DocViewerRenderers}
                      />
                      // <DocumentViewer
                      //   queryParams="hl=Nl"
                      //   url={file.isNew ? window.URL.createObjectURL(file.file) : `${file.url}`}
                      //   viewer={"office"}
                      //   ></DocumentViewer>
                    )}
                  </div>
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}>
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { DocumentModal }
