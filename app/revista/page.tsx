"use client";

import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Magazine from "@/components/revista/Magazine";

export default function RevistaPage() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navigation />
        <main>
          <Magazine />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
