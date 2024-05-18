import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();
  let id = 1;

  return (
    <main className="flex flex-col bg-zinc-950 w-full min-h-screen h-full p-10">
      <div className="relative block w-full h-20">
        <button className="absolute top-0 right-10 border-2 rounded-lg border-white px-2 py-1"
          onClick={() => router.push("/create")}>
          Create
        </button>
      </div>
      <div className="flex flex-wrap gap-10 justify-center items-center mx-auto">
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
        </div>
        <div onClick={() => router.push(`/credentials/${id}`)}
          className="border-2 rounded-md w-1/5 border-pink-700">
          <Card />
        </div>
      </div>
    </main>
  )
}
