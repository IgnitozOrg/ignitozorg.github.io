## Why

Visitors need a quick way to see recent Ignitoz YouTube content without leaving the landing page first. Showing current videos strengthens the page as a live portfolio and helps visitors understand the channel's latest focus.

## What Changes

- Add a visible latest videos section for the Ignitoz YouTube channel.
- Show the four most recently published real videos from the channel.
- Include each video's real thumbnail and make each item link to its corresponding YouTube video.
- Support the configuration needed for local development and production deployment.

## Capabilities

### New Capabilities

- `latest-videos`: Covers displaying recent YouTube videos from the Ignitoz channel, including real video thumbnails and links.

### Modified Capabilities

- None.

## Impact

- Affects the landing page experience and its visible content sections.
- Adds a dependency on YouTube Data API v3 as an external content source.
- Requires frontend environment configuration for the YouTube API key across local development and production deployment.
- Requires tests or validation covering successful video rendering and user navigation to video URLs.
