import React, { useContext } from 'react'
import { Android12Switch } from './Switch';
import { ThemeContext } from './ThemeProvider';
import { fredoka } from '..';


const Header = () => {
    const context = useContext(ThemeContext);

    if (!context) {
      throw new Error("Header must be used within a ThemeProvider");
    }

    const { theme, setTheme } = context;

  return (
    <div>
      <header
        className={`text-black flex flex-row items-center justify-around top-0 p-5 w-full ${
          theme ? "bg-slate-100" : "bg-zinc-700 text-white"
        }`}
        style={{fontFamily: fredoka.style.fontFamily}}
      >
        <h1 className='text-xl font-thin'>Image storage</h1>

        <div
          className={`max-sm:gap-0 max-sm:p-1 w-52 max-sm:w-24 p-2 flex flex-row gap-2 rounded-lg ${
            theme ? "bg-zinc-300" : "bg-zinc-600"
          } right-0`}
        >
          <Android12Switch onClick={() => setTheme((prev) => !prev)} />
          <h1 className="mt-2">
            <strong className="max-sm:hidden font-medium">Theme:</strong>{" "}
            {theme ? (
              <>
                <strong className="max-sm:hidden font-thin">light</strong> ☀️
              </>
            ) : (
              <>
                <strong className="max-sm:hidden font-thin">dark</strong> 🌑
              </>
            )}
          </h1>
        </div>
      </header>
    </div>
  );
}

export default Header
