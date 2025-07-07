<script>
  // Placeholder data - you can replace this with your actual state management
  let username = "MatheusCanuto07";
  let email = "matheus@example.com";
  let currentPassword = "";
  let newPassword = "";
  let confirmNewPassword = "";
  let selectedTheme = "light";
  
  const themes = [
    { name: "Light", value: "light", color: "bg-gray-100" },
    { name: "Dark", value: "dark", color: "bg-gray-800" },
    { name: "Cupcake", value: "cupcake", color: "bg-pink-100" },
    { name: "Emerald", value: "emerald", color: "bg-emerald-500" },
    { name: "Corporate", value: "corporate", color: "bg-blue-200" },
    { name: "Synthwave", value: "synthwave", color: "bg-purple-700" }
  ];
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-3xl mx-auto px-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
      <p class="text-sm text-gray-600">Manage your account preferences</p>
    </div>
    
    <!-- Profile Settings -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
      
      <form class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            bind:value={username}
            class="input input-bordered w-full mt-1"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="input input-bordered w-full mt-1"
          />
        </div>
        
        <div class="pt-2">
          <button type="submit" class="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
    
    <!-- Theme Settings -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Theme Settings</h2>
      
      <div class="space-y-3">
        <p class="text-sm text-gray-600">Select your preferred theme</p>
        
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {#each themes as theme}
            <button
              class="flex flex-col items-center p-2 rounded-md border-2 transition-all {selectedTheme === theme.value ? 'border-blue-500' : 'border-gray-200'}"
            >
              <div class="w-8 h-8 rounded-full {theme.color} mb-1"></div>
              <span class="text-xs">{theme.name}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Security Settings -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Security</h2>
      
      <form class="space-y-4">
        <div>
          <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            id="current-password"
            type="password"
            bind:value={currentPassword}
            class="input input-bordered w-full mt-1"
            required
          />
        </div>
        
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="new-password"
            type="password"
            bind:value={newPassword}
            class="input input-bordered w-full mt-1"
            required
          />
        </div>
        
        <div>
          <label for="confirm-new-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            id="confirm-new-password"
            type="password"
            bind:value={confirmNewPassword}
            class="input input-bordered w-full mt-1"
            required
          />
        </div>
        
        <div class="pt-2">
          <button type="submit" class="btn btn-primary">
            Change Password
          </button>
        </div>
      </form>
    </div>
    
    <!-- Footer with delete account option -->
    <div class="mt-8 pt-6 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-medium text-red-600">Danger Zone</h3>
          <p class="text-sm text-gray-500">Permanently delete your account and all data</p>
        </div>
        <button class="btn btn-outline btn-error">
          Delete Account
        </button>
      </div>
    </div>
    
    <!-- Current session info (optional) -->
    <div class="mt-6 text-center text-xs text-gray-500">
      <p>Current session: {username}</p>
      <p>Last login: 2025-04-28 23:27:51 UTC</p>
    </div>
  </div>
</div>