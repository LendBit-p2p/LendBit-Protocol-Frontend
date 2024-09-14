
const Page = () => {
    return (
        <div
        className="flex flex-col gap-6 items-center justify-center h-screen text-4xl font-bold font-[family-name:var(--font-geist-mono)] shadow-2xl"
        >
            Landing Page
            <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base px-4 sm:px-5"
            href="/dashboard"
            target=""
              rel="noopener noreferrer">
              
              dashboard
            </a>
        </div>
    )
}

export default Page
