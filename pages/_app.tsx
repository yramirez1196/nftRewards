import React from "react";

import Head from "next/head";




import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";

/* Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
}); */

export default function App({ Component, pageProps }: any) {

	
  const Layout = Component.layout || (({ children }:any) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Notus NextJS by Creative Tim</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
