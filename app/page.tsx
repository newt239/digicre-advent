import { Content } from "@/components/content";
import { getEntries } from "@/app/actions";

export default function Home() {
  const entries = getEntries();

  return (
    <main className="min-h-screen bg-background flex flex-col md:flex-row">
      <Content entries={entries} />
    </main>
  );
}
