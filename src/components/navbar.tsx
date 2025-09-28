export default function Navbar() {
  return (
    <header class="bg-background sticky inset-x-0 top-0 isolate flex shrink-0 items-center gap-2 border-b z-10">
      <div class="flex h-14 w-full items-center gap-2 px-4 justify-between">
        <a
          href="/"
          class="btn-link font-bold text-2xl"
        >
          blinks
        </a>
        <a
          href="/login"
          class="btn-outline"
        >
          login
        </a>
      </div>
    </header>
  );
}
