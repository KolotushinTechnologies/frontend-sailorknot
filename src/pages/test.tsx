import Link from "next/link"

const Page = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-134px)] items-center justify-center px-4 py-4 sm:px-12">
        <div className="text-center sm:flex-none">
          <img
            src="https://monoframe.ru/files/documents/attachments/af8c908c-be6d-46ad-88ff-405f989ef32e.jpeg"
            className="mx-auto mb-11"
            alt="images"
          />
          <Link
            href="/"
            className="inline-block w-full max-w-[200px] rounded-lg border border-black/5 bg-black/5 px-2 py-1 text-black/40 transition-all duration-300 hover:bg-transparent hover:text-black dark:border-white/5 dark:bg-white/5 dark:text-white/40 dark:hover:bg-transparent dark:hover:text-white">
            Назад на главную
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page
