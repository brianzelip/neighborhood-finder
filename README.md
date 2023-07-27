# Neighborhood Finder

![GitHub package.json version](https://img.shields.io/github/package-json/v/brianzelip/neighborhood-finder?color=%2312b337)

This is a [GitHub template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository) for creating a client-side geolocation web app that tells you which neighborhood you're in given any arbitrary city's data.

- single static html page
- uses the [Geolocation web api](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) to get the user's current position
- fetches neighborhoods geojson data from some city's API, saves it to browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- compares position to neighborhoods using [d3-polygon](https://d3js.org/d3-polygon)

## Usage

- [ ] find and replace $CITY with city name in index.html and app.js
- [ ] update `dataAPI` variable in app.js with the city's API
- [ ] update `searchUrlBase` variable in app.js with the base url for searching the city's website (the neighborhood name gets appended to the url as a parameter in `updateDOM()`), eg `'https://www.ci.missoula.mt.us/Search?searchPhrase='`
- [ ] update the footer link with the source code repo URL
- [ ] update this README file
- [ ] update package.json
- [ ] consider changing the color scheme in styles.css, see [Missoula](https://github.com/brianzelip/which-missoula-neighborhood/blob/main/styles.css) for an example
- [ ] consider updating the `nameEl` value in app.js when the neighborhood is not found
- [ ] consider changing author information in the head and footer of index.html, package.json, and LICENSE

## Examples

- [Baltimore](https://github.com/brianzelip/which-baltimore-neighborhood)
- [Missoula](https://github.com/brianzelip/which-missoula-neighborhood)

## Contributing

Open a PR!

## Author

[Brian Zelip](https://zelip.me)

## License

MIT
