## Purpose

Define how the landing page presents recent public videos from the official Ignitoz YouTube channel.

## Requirements

### Requirement: Latest videos section is visible
The system SHALL display a dedicated latest videos section for the Ignitoz YouTube channel on the landing page.

#### Scenario: Visitor reaches the landing page
- **WHEN** a visitor opens the landing page
- **THEN** the visitor can identify a section dedicated to recent Ignitoz YouTube videos

### Requirement: Recent videos come from the Ignitoz channel
The system SHALL display real public videos from the official Ignitoz YouTube channel.

#### Scenario: Channel videos load successfully
- **WHEN** recent Ignitoz channel video data is available
- **THEN** the section displays the four newest public videos from the channel in newest-first order

#### Scenario: Fewer than four public videos are available
- **WHEN** fewer than four public Ignitoz channel videos are available
- **THEN** the section displays only the available real videos without adding placeholder videos

### Requirement: Video items show real thumbnails
The system SHALL show the real thumbnail associated with each displayed YouTube video.

#### Scenario: A video item is displayed
- **WHEN** a video appears in the latest videos section
- **THEN** the item includes the thumbnail returned for that video

### Requirement: Video items link to YouTube videos
The system SHALL allow visitors to open each displayed video on YouTube.

#### Scenario: Visitor selects a video item
- **WHEN** a visitor activates a video item
- **THEN** the visitor is taken to the corresponding YouTube video

### Requirement: Unavailable video data does not create fake content
The system MUST NOT display fabricated videos when recent channel data cannot be loaded.

#### Scenario: Recent video data cannot be loaded
- **WHEN** recent Ignitoz channel video data is unavailable
- **THEN** the section remains understandable without showing fake video thumbnails or fake video links
