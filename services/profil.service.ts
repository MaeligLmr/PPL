 export const profilService = {

    
   getUserProfile: async (userId: string) => {
     // Simulate an API call to fetch user profile
     return new Promise((resolve) => {
       setTimeout(() => {
         resolve({
           id: userId,
           name: 'John Doe',
           email: 'john.doe@example.com',
         })
       }, 1000)
     })
   },
}
