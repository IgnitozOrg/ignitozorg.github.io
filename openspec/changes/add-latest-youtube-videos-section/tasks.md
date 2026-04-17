## 1. Environment and Setup

- [ ] 1.1 Add local environment example documentation for `VITE_YOUTUBE_API_KEY`
- [ ] 1.2 Document production deployment requirements for `VITE_YOUTUBE_API_KEY` and API key restrictions
- [ ] 1.3 Confirm the Ignitoz channel handle and provided desktop/mobile Figma references before styling

## 2. YouTube Data Integration

- [ ] 2.1 Create the `latest-videos` feature folder structure
- [ ] 2.2 Define the latest video domain types used by the feature
- [ ] 2.3 Implement YouTube channel uploads playlist resolution from the Ignitoz handle
- [ ] 2.4 Implement retrieval of the four newest playlist items from the uploads playlist
- [ ] 2.5 Normalize YouTube response items into video data with id, title, thumbnail, published date, and watch URL
- [ ] 2.6 Handle missing API key, API errors, malformed responses, empty responses, and fewer than four videos without fake content

## 3. UI and Page Integration

- [ ] 3.1 Build the latest videos section component with loading, success, empty, and error states
- [ ] 3.2 Render each video item with its real thumbnail and corresponding YouTube link
- [ ] 3.3 Add stable responsive layout and focus styles matching the desktop and mobile design references
- [ ] 3.4 Integrate the latest videos section into the landing page after the hero content
- [ ] 3.5 Adjust landing page spacing so the new section is discoverable across desktop and mobile viewports

## 4. Tests

- [ ] 4.1 Add service tests for successful channel lookup, playlist fetch, response normalization, and error cases
- [ ] 4.2 Add composable or section tests for loading, success, empty, and error UI states
- [ ] 4.3 Add rendering tests that verify real thumbnail URLs and video links are used from fetched data
- [ ] 4.4 Update existing home page tests to account for the latest videos section without live network calls

## 5. Validation

- [ ] 5.1 Run formatting and code quality checks
- [ ] 5.2 Run Vue type validation
- [ ] 5.3 Run unit tests
- [ ] 5.4 Run a production build
