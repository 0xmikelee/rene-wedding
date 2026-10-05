import { Attire } from "@/components/attire";
import { ClosingPhoto } from "@/components/closing-photo";
import { Hero } from "@/components/hero";
import { Rsvp } from "@/components/rsvp";
import { Schedule } from "@/components/schedule";
import { Venues } from "@/components/venues";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Schedule />
      <Venues />
      <Attire />
      <Rsvp />
      <ClosingPhoto />
    </main>
  );
}
