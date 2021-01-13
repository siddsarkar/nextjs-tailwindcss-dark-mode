import Nav from '../components/nav'

export default function IndexPage() {
  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="my-5 text-5xl text-center text-gray-700 dark:text-gray-100">
          Next.js + Tailwind CSS + Dark Toggle
        </h1>
        <h1 className="text-3xl py-2 text-center dark:bg-white bg-gray-700 dark:text-gray-700 text-gray-100">
          System + Manual
        </h1>
      </div>
    </div>
  )
}
