import { Html, Head, Main, NextScript } from "next/document";
import { NextSeo } from "next-seo";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Reminders</title>

        <NextSeo
          title="Reminders"
          description="Share and manage your tasks with the reminders app"
          canonical="reminders.oskarpetr.dev"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
