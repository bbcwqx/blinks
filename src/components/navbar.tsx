import { AppBskyActorProfile } from "../lib/generated_client.ts";

type Props = {
  did: string | undefined;
  bskyProfile: AppBskyActorProfile | undefined;
  bskyAvatarUrl: string | undefined;
};

export const ProfileButton = (
  props: Props,
) => {
  return (
    <div id="profile-dropdown-menu" class="dropdown-menu">
      <button
        type="button"
        class="btn-ghost"
        id="profile-dropdown-menu-trigger"
        aria-haspopup="menu"
        aria-controls="profile-dropdown-menu-menu"
        aria-expanded="false"
      >
        <img
          class="size-8 shrink-0 object-cover rounded-full"
          alt={props.bskyProfile?.displayName}
          src={props.bskyAvatarUrl}
        />
        {props.bskyProfile?.displayName}
      </button>
      <div
        data-popover
        aria-hidden="true"
        class="min-w-56"
        data-align="end"
      >
        <div
          role="menu"
          id="profile-dropdown-menu-menu"
          aria-labelledby="profile-dropdown-menu-trigger"
        >
          <div role="group" aria-labelledby="account-options">
            <div role="heading" class="font-bold">Me</div>
            <div role="menuitem">
              <a href={`/profile/${props.did}`}>
                Profile
              </a>
            </div>
          </div>
          <hr role="separator" />
          <div role="menuitem">
            <a href="/logout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Navbar(props: Props) {
  return (
    <header class="bg-background sticky inset-x-0 top-0 isolate flex shrink-0 items-center gap-2 border-b z-10">
      <div class="flex h-14 w-full items-center gap-2 px-4 justify-between">
        <a
          href="/"
          class="btn-link font-bold text-2xl"
        >
          blinks
        </a>
        {props.bskyProfile
          ? (
            <ProfileButton
              bskyProfile={props.bskyProfile}
              bskyAvatarUrl={props.bskyAvatarUrl}
              did={props.did}
            />
          )
          : (
            <a
              href="/login"
              class="btn-outline"
            >
              login
            </a>
          )}
      </div>
    </header>
  );
}
