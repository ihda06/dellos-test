import MainBanner from "./_components/MainBanner";
import NavigatorSection from "./_components/NavigatorSection";

export default function HomePage({}) {
  return (
    <div className="space-y-10">
      <MainBanner />
      <NavigatorSection />
    </div>
  );
}
