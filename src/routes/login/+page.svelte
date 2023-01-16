<script>
  import { goto } from '$app/navigation';
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from '$lib/firebase';

  let email;
  let password;
  let statusLoading = false;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return false;
    }else {
      statusLoading = true;
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        statusLoading = false;
        // console.log(user)
        // window.location = '/auction'
        goto('/auction')
      })
      .catch((error) => {
        statusLoading = false;
        console.log(error);
      });
    }
    
  };
</script>

<div>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" bind:value={email} autocomplete="email" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input id="password" name="password" type="password" bind:value={password} autocomplete="current-password" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div>
            <button type="submit" on:click={handleSubmit} disabled="{statusLoading}" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              {#if statusLoading}
                Sign in...
              {:else}
                Sign in
              {/if}
            </button>
          </div>
        </form>
  
      </div>
    </div>
  </div>
</div>

<style>
  
</style>