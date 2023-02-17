import Head from "next/head";
import PageWrapper from "@/components/PageWrapper";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";
import Header from "@/components/Header";
import About from "@/components/About";
import { AppointmentProvider } from "@/context/AppointmentProvider";
import Calendar from "@/components/Calendar";
import TimeOptionListContainer from "@/components/TimeOptionListContainer";
import ServiceListContainer from "@/components/ServiceListContainer";
import ContactFormContainer from "@/components/ContactFormContainer";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { PlusIcon, ScissorsIcon } from "@heroicons/react/20/solid";
import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import AddServiceModal from "@/components/admin/AddBarberServiceModal";
import AdminHeader from "@/components/admin/AdminHeader";
import BarberServicesContainer from "@/components/admin/BarberServicesContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>OC FADES</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full min-h-screen p-2 text-xs bg-neutral-50">
        <BarberServicesContainer />
      </div>
    </>
  );
}
