import CredCards from "@/components/ui/CredCards";
import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();
  let id = 1;

  return (
    <main className="flex flex-col bg-zinc-950 w-full min-h-screen h-full p-10">
      <div className="flex flex-wrap gap-10 justify-center items-center mx-auto">
        <CredCards />
        {/* <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div> */}
      </div>
    </main>
  )
}
