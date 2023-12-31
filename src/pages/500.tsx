import Link from "next/link"

interface PageProps {}

const Page = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-134px)] items-center justify-center px-4 py-4 sm:px-12">
        <div className="text-center sm:flex-none">
          <h2 className="mb-2 text-5xl font-semibold">500 - Ошибка во время выполнения запроса. Попробуйте позже.</h2>
          <img
            src="https://webonzer.com/snow/assets/images/image404.svg"
            className="mx-auto mb-11 dark:hidden"
            alt="images"
          />
          <img
            src="https://webonzer.com/snow/assets/images/image404.svg"
            className="mx-auto mb-11 hidden dark:block"
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
