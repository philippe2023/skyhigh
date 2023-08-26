'use client'
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
    <select
      value={theme}
      onChange={e => setTheme(e.target.value)}
      className="mt-6 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  </>
  );
}

export default ThemeSwitch;
