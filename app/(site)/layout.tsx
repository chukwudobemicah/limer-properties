import Header from "@/component/Header";
import Footer from "@/component/Footer";
import FloatingWhatsApp from "@/component/FloatingWhatsApp";
import SiteLoader from "@/component/SiteLoader";
import { ToastProvider } from "@/component/Toast";
import { MotionProvider } from "@/component/Motion";

/** The public website's frame. Sanity Studio (/studio) sits outside it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteLoader />
      <MotionProvider>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ToastProvider>
      </MotionProvider>
    </>
  );
}
