import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex-1 w-full flex items-center justify-center">
      <section className="flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Plan your trips with Expense
          <span className="text-green-600">Share</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl drop-shadow">
          Simplify group expenses and enjoy your travels without financial
          worries. ExpenseShare is here to make your travel planning hassle-free
          and fun.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/sign-in"
            className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-medium shadow-lg cursor-pointer"
          >
            Get Started
          </Link>
          <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium shadow-lg cursor-pointer">
            Learn More
          </button>
        </div>
      </section>
    </main>
  )
}
