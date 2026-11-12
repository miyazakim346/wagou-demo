import FirstView from "./_components/FirstView";
import AboutSection from "./_components/AboutSection";
import ServiceSection from "./_components/ServiceSection";
import MenuSection from "./_components/MenuSection";
import TeaProcessSection from "./_components/TeaProcessSection";
import BlogSection from "./_components/NewsSection";
import MediaSection from "./_components/MediaSection";
import InfoSection from "./_components/InfoSection";
import LoadingScreen from "@/features/loadingScreen/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <main>
        <FirstView />
        <AboutSection />
        <ServiceSection />
        <MenuSection />
        <TeaProcessSection />
        <BlogSection />
        <MediaSection />
        <InfoSection />
      </main>
    </>
  );
}
