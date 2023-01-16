<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import countDown from 'time-countdown-dhms';
  import { auth, db } from '$lib/firebase';
  import { userStore } from 'sveltefire';
  import { onMount } from 'svelte';
  import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
  
  const user = userStore(auth);

  let auctionDetail;
  let bidPrice;
  let bidPriceErrorText;
  let bidPriceStatusLoading = false;

  onMount( () => {
    getDetail();
	});

  const getDetail = async () => {
    const listRef = doc(db, `auctions`, $page.params.id);
    const docSnap = await getDoc(listRef);
    if (docSnap.exists()) {
      auctionDetail = docSnap.data();
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!bidPrice || bidPrice <= auctionDetail.currentPrice) {
      bidPriceErrorText = "Please input more price!"
      return;
    }
    else {
      bidPriceErrorText = "";
    }
    const listRef = doc(db, `auctions`, $page.params.id);
    try {
      bidPriceStatusLoading = true;
      await updateDoc(listRef, {"currentPrice": bidPrice});
      getDetail();
      clearForm();
      bidPriceStatusLoading = false;
      goto('/auction');
    }
    catch(e) {
      console.log(e)
      bidPriceStatusLoading = false;
    }
  };
  const clearForm = ()=> {
    bidPrice = "";
  }
</script>

<div>
  {#if $user}
    <div class="bg-white">
      {#if auctionDetail}
        <main>
          <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
            <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{auctionDetail.title}</h1>
            <form class="mt-12">
              <section aria-labelledby="cart-heading">
                <div class="border-t border-b border-gray-200">
                  <div class="sm:flex py-6">
                    <div class="flex-1">
                      <img src={auctionDetail.imageUrl} alt="" class="h-12 w-12 rounded-md object-cover object-center sm:h-16 sm:w-16">
                      <div class="mt-4">
                        <h4 class="text-sm">
                          <div class="text-xl font-medium text-gray-700 hover:text-gray-800"></div>
                        </h4>
                      </div>
                    </div>
      
                    <div class="mt-6 sm:mt-0 flex flex-1 flex-col sm:ml-6">
                      <div class="">
                        <div data-controller="timedown" data-timedown-end-time="{auctionDetail.endTime}">
                          <div data-timedown-target="time" class="mb-6 text-red-500"></div>
                        </div>
                        <span class="text-xs text-gray-500">Top Bid</span>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">${auctionDetail.currentPrice} /kg</h3>
                        {#if $user.uid != auctionDetail.createUserUid}
                          <form class="mt-5">
                            <div class="w-full mb-3">
                              <label for="price" class="mb-1 block text-sm font-medium text-gray-700">My max bid</label>
                              <input type="number" name="price" id="price" bind:value={bidPrice} placeholder="Enter price" autocomplete="off" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                              {#if bidPriceErrorText}
                                <div class="mt-1 text-sm text-red-500">{bidPriceErrorText}</div>
                              {/if}
                            </div>
                            <button type="submit" on:click={handleSubmit} disabled={bidPriceStatusLoading} class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">
                              {#if bidPriceStatusLoading}
                                Place Bid...
                              {:else}
                                Place Bid
                              {/if}
                            </button>
                          </form>
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
      
        </main>
      {/if}
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
</div>

<style>
  
</style>