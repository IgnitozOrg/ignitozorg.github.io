## ADDED Requirements

### Requirement: Latest videos section is visible
The landing page SHALL include a visible section dedicated to recent channel videos.

#### Scenario: Visitor opens the landing page
- **WHEN** a visitor opens the landing page
- **THEN** the page presents a latest videos section that is separate from the primary hero copy and call to action

### Requirement: Latest videos are recognizable as recent channel content
The section SHALL clearly communicate that its items represent recent videos from the channel.

#### Scenario: Visitor scans the section
- **WHEN** a visitor views the section label and video items
- **THEN** the visitor can recognize that the section contains latest or recent channel videos

### Requirement: Four recent video items are displayed
The section SHALL display the four most recent published videos available for the channel.

#### Scenario: Recent videos are available
- **WHEN** the channel has at least four published videos available
- **THEN** the section presents four video items ordered from newest to oldest

### Requirement: Video items have visual representations
Each video item SHALL include a visual representation of the published video.

#### Scenario: Video item is rendered
- **WHEN** a video item appears in the latest videos section
- **THEN** the item includes a visual thumbnail or equivalent video-specific image

### Requirement: Video items are differentiated from the main content
Video items SHALL be presented as content distinct from the landing page's primary hero message.

#### Scenario: Visitor compares hero content and videos
- **WHEN** a visitor views the hero message and latest videos section together
- **THEN** the video items appear as a separate group of selectable video content

### Requirement: Video items link to corresponding videos
Each video item SHALL let the visitor visit the corresponding video.

#### Scenario: Visitor activates a video item
- **WHEN** a visitor clicks or otherwise activates a video item
- **THEN** the visitor is taken to that item's corresponding YouTube video
