"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: (e) => {
          console.error("Error creating user:", e);
        },
        onSuccess: () => {
          alert("User created successfully");
        },
      }
    );
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (e) => {
          console.error("Error logging in:", e);
        },
        onSuccess: () => {
          alert("Logged in successfully");
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1>Welcome back, {session.user.name}!</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>Welcome to Next Meet AI</h1>
      <Input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create User</Button>

      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onLogin}>Login</Button>
    </div>
  );
}
