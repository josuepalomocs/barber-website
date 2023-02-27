import Head from "next/head";
import PageWrapper from "@/components/PageWrapper";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppointmentFlow from "@/components/AppointmentFlow";
import BarberLocation from "@/components/BarberLocation";
import BarberHours from "@/components/BarberHours";
import Footer from "@/components/Footer";

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
        <Header openSidebar={openSidebar} />
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar}>
          <AppointmentFlow closeSidebar={closeSidebar} />
        </Sidebar>
        <div className="grid space-y-12 bg-neutral-50 py-12">
          <div className="flex justify-center items-center">
            <Hero />
          </div>
          <hr className="" />
          <div className="px-4 flex justify-center items-center">
            <BarberHours />
          </div>
          <div className="px-4 flex justify-center items-center">
            <BarberLocation />
          </div>
          <Footer />
        </div>
      </PageWrapper>
    </>
  );
}
