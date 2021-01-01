import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var storageKey = 'dark';
                  var classNameDark = 'dark';
                  var classNameLight = 'light';
                  var d = document.querySelector('html');

                  //set class on html doc
                  function setClassOnDocumentBody(dark) {
                    d.classList.add(dark ? classNameDark : classNameLight);
                    d.classList.remove(dark ? classNameLight : classNameDark);
                  }

                  //media query
                  var preferDarkQuery = '(prefers-color-scheme: dark)';
                  var mql = window.matchMedia(preferDarkQuery);
                  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
                  //logger
                  console.log("supportsColorSchemeQuery:%s and prefersDark:%s",supportsColorSchemeQuery,mql.matches);

                 //local storage
                  var localStorageTheme = null;
                  try {
                    localStorageTheme = localStorage.getItem(storageKey);
                  } catch (err) {}
                  var localStorageExists = localStorageTheme !== null;
                  //logger
                  console.log("localStorageExists:%s and localStorageDark:%s",localStorageExists,JSON.parse(localStorageTheme));

                  
                  if (localStorageExists) {
                    localStorageTheme = JSON.parse(localStorageTheme);
                  }



                  if (localStorageExists) {
                    setClassOnDocumentBody(localStorageTheme);
                    console.log("setting theme from ls");       
                  } else if (supportsColorSchemeQuery) {
                    setClassOnDocumentBody(mql.matches);
                    console.log("setting theme from mq");

                    // localStorage.setItem(storageKey, mql.matches);
                  }else {
                    var isDarkMode = d.classList.contains(classNameDark);
                    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
                    console.log("setting theme from class")
                  }
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
