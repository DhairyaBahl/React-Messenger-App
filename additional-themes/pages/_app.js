import useColorTheme from "use-color-theme";

export const _App = ({ pageProps, Component }) => {
  const colorTheme = useColorTheme('light-theme', {
    classNames: ['light-theme', 'dark-theme', 'funky']
  });
  return (
    <>
      <style jsx global>{`
        ...

        .light-theme {
          --button-bg: #e2e8f0;
          --button-bg-hover: #cdd7e5;
          --background: #fff;
          --headings: #000;
          --text: #38393e;
        }

        .dark-theme {
          --button-bg: rgb(255 255 255 / 0.08);
          --button-bg-hover: rgb(255 255 255 / 0.16);
          --background: #171923;
          --headings: #f9fafa;
          --text: #a0aec0;
        }

        .funky {
          --button-bg: #1f2833;
          --button-bg-hover: #425069;
          --background: #0b0c10;
          --headings: #66fcf1;
          --text: #e647ff;
        }
    `}</style>
      <header>
        <nav>
          <button onClick={colorTheme.toggle}>Toggle</button>
        </nav>
      </header>
      ...
    </>
  );
};

<nav>
  <button onClick={() => colorTheme.set('light-theme')}>Light</button>
  <button onClick={() => colorTheme.set('dark-theme')}>Dark</button>
  <button onClick={() => colorTheme.set('funky')}>Funky</button>
  <button onClick={() => colorTheme.toggle()}>Toggle</button>
</nav>

export default _App;