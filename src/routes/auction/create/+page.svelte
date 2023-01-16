<script>
  import { goto } from '$app/navigation';
  import { auth } from '$lib/firebase';
  import { userStore } from 'sveltefire';
  import Flatpickr from 'svelte-flatpickr';
  import 'flatpickr/dist/flatpickr.css';
  const user = userStore(auth);
  import { db } from "$lib/firebase";
  import { collection, setDoc, addDoc, Timestamp } from "firebase/firestore";

  const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
  };

  let title;
  let price;
  let endTime;
  let imageUrl;
  let createUserUid;
  let createStatusLoading = false;
  let createErrorText = "";

  const clearForm = ()=> {
    title = "";
    price = "";
    endTime = "";
    imageUrl = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !price || !endTime || !imageUrl) {
      createErrorText = "Please enter complete information!"
      return;
    }
    else {
      createErrorText = "";
    }
    try {
      createStatusLoading = true;
      await addDoc(collection(db, "auctions"), {
        title: title,
        startPrice: price,
        currentPrice: price,
        createdAt: Date.now(),
        endTime: endTime.getTime(),
        imageUrl: imageUrl,
        createUserUid: $user.uid,
      });
      clearForm();
      createStatusLoading = false;
      goto('/auction');
    }
    catch(e) {
      console.log(e)
      createStatusLoading = false;
    }
  };
</script>
{#if $user}
  <div class="px-4 my-6 md:my-20">
    <div class="max-w-screen-sm mx-auto">
      <form class="space-y-8">
        <div class="space-y-8">
          <div>
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            </div>
      
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-6">
                <label for="auction-title" class="block text-sm font-medium text-gray-700">Title</label>
                <div class="mt-1">
                  <input type="text" name="auction-title" id="auction-title" bind:value={title} autocomplete="auction-title" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
              </div>
      
              <div class="sm:col-span-6">
                <label for="auction-price" class="block text-sm font-medium text-gray-700">Start price</label>
                <div class="mt-1">
                  <input type="number" name="auction-price" id="auction-price" bind:value={price} autocomplete="auction-price" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="last-name" class="block text-sm font-medium text-gray-700">End time</label>
                <div class="mt-1">
                  <Flatpickr {options} bind:value={endTime} name="date" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="Photo" class="block text-sm font-medium text-gray-700">Photo</label>
                <div class="mt-1">
                  <input id="photo" name="photo" accept="image/png, image/jpg, image/jpeg" type="file" bind:value={imageUrl} class="">
                </div>
              </div>

              <div class="sm:col-span-6">
                {#if createErrorText}
                  <p class="text-sm text-red-500">{createErrorText}</p>
                {/if}
              </div>
      
            </div>
          </div>
        </div>
      
        <div class="pt-5">
          <div class="flex justify-end">
            <button type="submit" disabled={createStatusLoading} on:click={handleSubmit} class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              {#if createStatusLoading}
                Save...
              {:else}
                Save
              {/if}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{:else}
  <div aria-live="assertive" class="mt-20 mx-auto flex items-center px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-center">
      <div class="pointer-events-auto w-full max-w-sm text-center">
        <p class="text-sm font-medium text-gray-900">Please Login</p>
        <div class="mt-4 flex justify-center">
          <a href="/login" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Log In</a>
        </div>
      </div>
    </div>
  </div>
{/if}


