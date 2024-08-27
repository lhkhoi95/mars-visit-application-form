import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center bg-[#2c2729]">
      <Image
        src="/mars.gif"
        width={1200}
        height={600}
        alt="mars"
        className="w-full"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center duration-300 animate-in">
        <h1 className="text-3xl font-bold text-[#fe4700] md:text-5xl lg:text-9xl">
          M A R S
        </h1>
        <p className="text-sm text-[#fec672] md:text-xl">
          Mars Awaits: Your Journey Begins Here — Apply Now for the Ultimate
          Space Adventure!
        </p>
        <Link href="/apply">
          <Button className="mt-4">Get Started</Button>
        </Link>
      </div>
    </main>
  );
}
