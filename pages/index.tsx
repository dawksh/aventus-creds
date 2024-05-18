import CredCards from "@/components/ui/CredCards";


export default function Home() {

  return (
    <main className="flex flex-col bg-zinc-950 w-full min-h-screen h-full p-10">
      <div className="flex flex-wrap gap-10 justify-center items-center mx-auto">
        <CredCards />
      </div>
    </main>
  )
}
