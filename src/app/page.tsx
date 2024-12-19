"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <div>
      <h1>Dashboard</h1>
      <SignedOut>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
    </div>
  );
}