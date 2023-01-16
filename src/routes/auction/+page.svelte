<script>
  import { collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
  import { db } from "$lib/firebase";

  let auctionList=[];
  const get = async ()=> {
    try {
      const listRef = collection(db, "auctions");
      const q = query(listRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        auctionList = [];
        // console.log('querySnapshot',querySnapshot)
        querySnapshot.forEach(doc => {
          auctionList.push({id:doc.id,...doc.data(), pending:doc.data().endTime > new Date().getTime()});
        })
        // console.log('auctionList',auctionList)
      })
    }
    catch(e) {
      console.log(e)
    }
  }
  get();
</script>

<div class="flex-1">
  <div class="max-w-4xl mx-2 md:mx-4 lg:mx-auto">
    <section>
      <div class="relative" style="min-height: 140px;">
        <div class="mt-4" id="">
          <ul class="space-y-4">
            {#each auctionList as auction, index (auction.id)}
              {#if auction.pending}
                <li>
                  <a href="/auction/{auction.id}" class= "block p-4 pb-5 md:p-6 rounded-lg shadow-t-sm transition duration-300 ease-in-out border-2 border-transparent hover:border-indigo-600 relative bg-white">
                    <div class="absolute h-1 left-0 right-0 top-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-1"></div>
                    <div class="md:flex md:items-center">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 md:mr-4 lg:mr-6">
                          <img class="w-full h-full" src="{auction.imageUrl}" alt=""/>
                        </div>
                        <div class="md:hidden w-px h-4 bg-gray-200"></div>
                        <div class="md:hidden flex items-center space-x-2 bg-violet-50 text-violet-500 rounded-md px-2 py-1">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.686 9.79473L12.9377 10.5554C12.8245 10.6706 12.6414 10.6706 12.5286 10.5554L8.39237 6.3506L6.28196 8.49613C6.16872 8.61125 5.98564 8.61125 5.8728 8.49613L3.38817 5.97014C3.27493 5.85502 3.27493 5.66889 3.38817 5.55417L8.76649 0.0863437C8.87973 -0.0287812 9.06282 -0.0287812 9.17566 0.0863437L11.6603 2.61233C11.7735 2.72745 11.7735 2.91358 11.6603 3.0283L9.54968 5.17382L13.6857 9.37866C13.7987 9.49358 13.7988 9.68002 13.686 9.79473ZM8.10304 12.5286H7.81358V11.9403C7.81358 11.7779 7.68399 11.646 7.52412 11.646L0.868387 11.6462C0.708722 11.6462 0.578924 11.7779 0.578924 11.9405V12.5288H0.289463C0.129797 12.5288 0 12.6606 0 12.8231V13.7057C0 13.868 0.129591 14 0.289463 14H8.10271C8.26237 14 8.39217 13.8683 8.39217 13.7057V12.8231C8.39237 12.6606 8.26291 12.5286 8.10304 12.5286Z" fill="#875BF7"/>
                          </svg>
                          <span class="text-xs font-medium leading-normal">Auction #{auctionList.length-index}</span>
                        </div>
                      </div>
                      <div class="mt-4 md:mt-0 flex-1 lg:truncate auction-truncate">
                        <div class="lg:flex auction-info">
                          <div class="flex-1 lg:truncate auction-truncate">
                            <div class="text-base md:text-sm font-semibold md:font-medium leading-tight text-gray-900 lg:truncate auction-truncate md:mr-4 lg:mr-6 mb-2 md:mb-0">
                              {auction.title}
                            </div>
                            <div class="hidden">
                              <span class="text-sm text-gray-500">
                                {#if true}
                                  Seasonal Quota
                                {:else}
                                  Permanent Quota
                                {/if}
                              </span>
                            </div>
                            <div class="hidden md:flex flex-wrap items-center">
                              <div class="badge badge-danger-light mr-2 mt-2">
                                Auction #{auctionList.length-index}
                              </div>
                              {#if false}
                                <span class="badge badge-gray-light mr-2 mt-2">
                                  {#if true}
                                    Seasonal Quota
                                  {:else}
                                    Permanent Quota
                                  {/if}
                                </span>
                                {#if true}
                                  <span class="badge badge-gray-light mr-2 mt-2">
                                    No reserve
                                  </span>
                                {/if}
                                {#if false}
                                  <span class="badge badge-gray-light mr-2 mt-2">
                                    Reserve not met
                                  </span>
                                {/if}
                              {/if}
                              {#if false}
                                <span class="badge badge-success-light mr-2 mt-2">
                                  Reserve met
                                </span>
                              {/if}
                            </div>
                          </div>
                          <div class="flex flex-col-reverse md:flex-col">
                            <div class="flex items-center lg:justify-end md:mb-1 lg:mb-2 auction-price">
                              <span class="text-base md:text-sm font-medium md:font-bold text-gray-900 md:text-gray-700 underline md:no-underline">
                                ${auction.currentPrice}/kg
                              </span>
                              {#if false}
                                <div class="flex-shrink-0 ml-2 text-sm text-gray-500">
                                  count bids
                                </div>
                              {/if}
                              <div class="hidden">
                                {#if true}
                                  <span class="ml-2 text-sm text-gray-400">
                                    No reserve
                                  </span>
                                {/if}
                                {#if false}
                                  <span class="ml-2 text-sm text-gray-400">
                                    Reserve not met
                                  </span>
                                {/if}
                                {#if false}
                                  <span class="ml-2 text-sm text-gray-900">Reserve met</span>
                                {/if}
                              </div>
                            </div>
                            <div class="lg:text-right auction-time mb-2 md:mb-0">
                              <div data-controller="timedown" data-timedown-end-time="{auction.endTime}">
                                <div data-timedown-target="time" class="text-red-500"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-white text-sm font-normal bg-transparent;
  }
  .badge-danger-light {
    @apply bg-red-200 bg-opacity-10 text-red-500;
  }
  .badge-gray-light {
    @apply bg-gray-200 text-gray-500;
  }
  .badge-success-light {
    @apply bg-green-50 text-green-700;
  }
  .shadow-t-sm {
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04);
  }
</style>