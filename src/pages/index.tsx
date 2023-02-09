import Head from "next/head";
import PageWrapper from "@/components/PageWrapper";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";
import Header from "@/components/Header";

export default function Home() {
  const { isOpen, openSidebar, closeSidebar } = useSidebar();

  return (
    <>
      <Head>
        <title>OCF Barber</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <Header />
        <Main>
          <button className="" onClick={openSidebar}>
            Open sidebar
          </button>
          <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
        </Main>
      </PageWrapper>
    </>
  );
}
