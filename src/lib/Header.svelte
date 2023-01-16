<script>
	import { page } from '$app/stores';
	import Logo from '$lib/images/logo.svelte';
	import github from '$lib/images/github.svg';

  import { auth } from '$lib/firebase';
  import { signOut } from "firebase/auth";
  import { userStore } from 'sveltefire';
  const user = userStore(auth);

  const signOutSubmit = ()=> {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
</script>

<header>
  <div class="bg-whit border-b border-gray-200">
    <div>
      <div class="px-4 lg:px-8 py-5">
        <nav class="relative flex items-center justify-between text-gray-800" aria-label="Global">
          <div class="flex items-center space-x-2 lg:space-x-8">
            <a href="/" class="flex items-center">
              <Logo />
            </a>
            <div class="hidden md:block w-px h-6 bg-gray-200"></div>
            <div class="flex items-center">
              <a href="/auction" class="hidden md:block lg:-ml-4 font-medium text-gray-700 rounded-lg hover:text-gray-900 hover:bg-gray-300 px-3 lg:px-4 py-1 md:py-2">
                Marketplace
              </a>
              <a href="/auction/create" class="hidden md:block font-medium text-default rounded-lg hover:text-gray-900 hover:bg-gray-300 px-3 lg:px-4 py-1 md:py-2">
                Create an Auction
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-3 lg:space-x-8">
            <a href="/" class="hidden">
              <svg width="28" height="28" viewBox="0 0 32 32" class="text-gray-800 hover:text-indigo-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9894 27C18.8018 26.9973 21.3662 25.9409 23.3112 24.2C21.483 22.2294 18.8742 21 15.9788 21C13.0885 21 10.4838 22.225 8.65608 24.1896C10.601 25.9348 13.1711 26.9973 15.9894 27ZM7.2917 22.7214C9.47726 20.4287 12.5612 19 15.9788 19C19.4086 19 22.5023 20.4389 24.6892 22.746C26.1375 20.8832 27 18.5423 27 16C27 9.92487 22.0751 5 16 5C9.92487 5 5 9.92487 5 16C5 18.5311 5.8549 20.8626 7.2917 22.7214ZM6.00945 24.3185C4.13043 22.0642 3 19.1641 3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C15.9949 29 15.9898 29 15.9847 29C15.9828 29 15.9808 29 15.9788 29C11.9698 29 8.38468 27.1853 6 24.3326C6.00315 24.3279 6.0063 24.3232 6.00945 24.3185ZM19 12C19 13.6569 17.6569 15 16 15C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9C17.6569 9 19 10.3431 19 12ZM21 12C21 14.7614 18.7614 17 16 17C13.2386 17 11 14.7614 11 12C11 9.23858 13.2386 7 16 7C18.7614 7 21 9.23858 21 12Z"  fill="currentColor"/>
              </svg>
            </a>
  
            <!-- support -->
            <div data-controller="comp-dropdown" class="md:relative">
              <button data-action="click->comp-dropdown#toggle click@window->comp-dropdown#hide" type="button" class="block lg:-mr-4">
                <div class="hidden md:block font-medium text-gray-700 rounded-lg hover:text-gray-900 hover:bg-gray-300 px-3 lg:px-4 py-1 md:py-2">
                  Contact Us
                </div>
                <div data-comp-dropdown-target="icon">
                  <svg class="md:hidden text-gray-800 hover:text-indigo-600 active:text-indigo-600" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.2164 8.36297H20.1818C20.664 8.36297 21.1265 8.55454 21.4675 8.89553C21.8084 9.23652 22 9.699 22 10.1812V13.8178C22 14.3 21.8084 14.7625 21.4675 15.1035C21.1265 15.4445 20.664 15.6361 20.1818 15.6361H19.2164C18.9947 17.3937 18.1393 19.01 16.8107 20.1817C15.482 21.3534 13.7715 22 12 22V20.1817C13.4466 20.1817 14.834 19.607 15.8569 18.5841C16.8799 17.5611 17.4545 16.1736 17.4545 14.7269V9.2721C17.4545 7.8254 16.8799 6.43795 15.8569 5.41497C14.834 4.39199 13.4466 3.81729 12 3.81729C10.5534 3.81729 9.16598 4.39199 8.14305 5.41497C7.12013 6.43795 6.54545 7.8254 6.54545 9.2721V15.6361H3.81818C3.33597 15.6361 2.87351 15.4445 2.53253 15.1035C2.19156 14.7625 2 14.3 2 13.8178V10.1812C2 9.699 2.19156 9.23652 2.53253 8.89553C2.87351 8.55454 3.33597 8.36297 3.81818 8.36297H4.78364C5.00548 6.60552 5.86098 4.98942 7.18961 3.81791C8.51824 2.6464 10.2287 2 12 2C13.7713 2 15.4818 2.6464 16.8104 3.81791C18.139 4.98942 18.9945 6.60552 19.2164 8.36297ZM3.81818 10.1812V13.8178H4.72727V10.1812H3.81818ZM19.2727 10.1812V13.8178H20.1818V10.1812H19.2727ZM8.14545 15.4406L9.10909 13.8987C9.97552 14.4415 10.9776 14.7286 12 14.7269C13.0224 14.7286 14.0245 14.4415 14.8909 13.8987L15.8545 15.4406C14.6993 16.1644 13.3632 16.5473 12 16.5452C10.6368 16.5473 9.30067 16.1644 8.14545 15.4406Z" fill="currentColor"/>
                  </svg>
                </div>
              </button>
              <div data-comp-dropdown-target="menu" class="hidden origin-top-right absolute right-0 mt-2 w-full md:w-72 rounded-md shadow-lg bg-white border border-default focus:outline-none z-50">
                <div class="">
                  <div class="flex justify-between items-center py-4 px-6 border-b border-default">
                    <h2 class="text-base text-gray-800 leading-normal font-medium">
                      Support
                    </h2>
                    <span class="text-xxs text-tertiary">We’re here to help</span>
                  </div>
                  <div class="wacthlist-input watchlist-height px-6 pt-4 pb-6">
                    <div class="flex flex-col">
                      <span class="text-xxs text-gray-500">Send us an enquiry</span>
                      <a
                        class="mt-1 text-indigo-600 hover:text-indigo-700"
                        href="mailto:support@beachprice.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        support@beachprice.com
                      </a>
                    </div>
                    <div class="mt-4 flex flex-col">
                      <span class="text-xxs text-gray-500">Request a priority callback </span>
                      <span class="mt-1 text-sm text-gray-700">Send a SMS to <strong> 0400 417 467 </strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {#if $user}
              <p class="text-sm md:text-base font-medium text-gray-800">{$user.email}</p>
              <div class="w-px h-6 bg-gray-200"></div>
              <p on:click={signOutSubmit} class="text-sm md:text-base font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">Log Out</p>
            {:else}
              <a class="text-sm md:text-base font-medium text-gray-800 hover:text-indigo-600" href="/login">Log In</a>
            {/if}
            <div data-controller="comp-dropdown" class="hidden">
              <button data-action="click->comp-dropdown#toggle click@window->comp-dropdown#hide" type="button" class="block">
                <span class="sr-only">Open main menu</span>
                <div class="hamburger-menu" data-comp-dropdown-target="icon">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <!-- Select popover, show/hide based on select state. -->
              <div data-comp-dropdown-target="menu" class="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-white ring-opacity-5 divide-y divide-gray-200 focus:outline-none z-50">
                <div class="py-1">
                  <a href="/" class="block px-4 py-3 text-sm font-medium hover:bg-gray-100 text-gray-900">Quota Marketplace</a>
                  <a href="/" class="block px-4 py-3 text-sm font-medium hover:bg-gray-100 text-gray-900">Create a Listing</a>
                  <a href="/" class="hidden block px-4 py-3 text-sm font-medium hover:bg-gray-100 text-gray-900">Pricing and Fees</a>
                  <a href="/" class="hidden block px-4 py-3 text-sm font-medium hover:bg-gray-100 text-gray-900">How It Works</a>
                  <a href="mailto:support@beachpirce.com" class="hidden block px-4 py-3 text-sm font-medium hover:bg-gray-100 text-gray-900">Email Support</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  
  
</header>

<style>
.text-xxs {
  font-size: 12px;
}
.hamburger-menu {
  width: 24px;
  height: 16px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.hamburger-menu:hover span {
  @apply bg-indigo-600;
}
.hamburger-menu span {
  @apply bg-gray-800;
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.hamburger-menu span:nth-child(1) {
  top: 0;
}

.hamburger-menu span:nth-child(2),
.hamburger-menu span:nth-child(3) {
  top: 7px;
}

.hamburger-menu span:nth-child(4) {
  top: 14px;
}

.hamburger-menu.open span:nth-child(1) {
  top: 7px;
  width: 0;
  left: 50%;
}

.hamburger-menu.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.hamburger-menu.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.hamburger-menu.open span:nth-child(4) {
  top: 7px;
  width: 0;
  left: 50%;
}
</style>
