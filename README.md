# Store Rating

A simple, dependency-free store rating app. Pick a store, give it 1–5 stars, and see its average rating. Ratings are saved in your browser using `localStorage`.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server.

## Build and run with Docker

Build the image:

```sh
docker build -t store-rating .
```

Start the app on port 8080:

```sh
docker run --name store-rating-app -d -p 8080:80 store-rating
```

Open [http://localhost:8080](http://localhost:8080). Stop and remove the container with:

```sh
docker rm -f store-rating-app
```

## Keep the source on GitHub

This project is maintained in [VishwajitS7/store-rating](https://github.com/VishwajitS7/store-rating). After making changes, commit and push them to GitHub:

```sh
git add .
git commit -m "Describe your change"
git push origin main
```
