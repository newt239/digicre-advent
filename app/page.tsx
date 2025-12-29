import { Content } from "@/components/content";
import { getEntries } from "@/app/actions";

export default async function Home() {
  const entries = await getEntries();

  return (
    <main className="min-h-screen bg-background flex flex-col md:flex-row">
      <Content entries={entries} />
    </main>
  );
}
