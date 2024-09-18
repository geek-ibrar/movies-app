# Welcome to your Expo app 👋

This is a simple movie app that search movies from [OMDB API](http://www.omdbapi.com/). It is created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Add your API key in `/redux/slice/MoviesSlice.ts`

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Requirements:
[X] Use the OMDB API (http://www.omdbapi.com/) for movie data.
[X] Create a search input field where users can enter movie titles.
[X] Implement a debounce function to limit API calls while typing.
[X] Display search results in a scrollable list, showing movie title, year, and poster image.
[X] Implement infinite scrolling to load more results as the user scrolls.
[X] Use Redux to manage the application state, including search results and loading status.
[X] Create a "Favorites" feature where users can mark movies as favorites and view them in a separate list.
[X] Implement proper TypeScript typing throughout the application.
[X] Handle error states and edge cases (e.g., no results, network errors).
[X] Bonus: Implement a simple unit test for one of the Redux reducers.
