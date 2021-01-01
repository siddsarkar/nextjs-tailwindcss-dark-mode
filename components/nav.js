import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "../theme/ThemeContext";

const links = [
  { href: "https://github.com/vercel/next.js", label: "GitHub" },
  { href: "https://nextjs.org/docs", label: "Docs" },
];

export default function Nav() {
  const { dark, auto, toggleAuto, toggleDark } = useContext(ThemeContext);

  return (
    <nav>
      <ul className='flex items-center justify-between p-8'>
        <li>
          <Link href='/'>
            <a
              onClick={() => toggleModes()}
              className='no-underline text-accent-1 dark:text-blue-300'
            >
              Home
            </a>
          </Link>
        </li>
        <ul className='flex items-center justify-between space-x-4'>
          <li>
            <div className='btn-blue' onClick={() => toggleAuto()}>
              {auto ? "Unfollow System" : "Follow System"} Theme
            </div>
          </li>
          {!auto && (
            <li>
              <div className='btn-blue' onClick={() => toggleDark()}>
                {dark ? "Light" : "Dark"} Theme
              </div>
            </li>
          )}
        </ul>
      </ul>
    </nav>
  );
}
